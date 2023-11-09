import express from "express";
import mysql from "mysql"
import cors from "cors"
import multer from "multer"; // Import multer
import fs from "fs"; // Import the fs module


const app = express()

app.use(cors()); // allowing client to reach backend
app.use(express.json())



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "testDB"
})

/* IMAGE UPLOAD PART ***************************************************************************************************/
// Configure multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../my-app/src/uploadstest'); // Specify the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename
    },
});

const upload = multer({ storage });

// New route for handling file uploads
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    console.log("file (image) upload success")
    return res.json({ message: "File uploaded successfully" });
});

/* IMAGE UPLOAD PART ***************************************************************************************************/


app.get("/", (req, res) => {
    res.json("hello this is backend")
})

app.get("/users", (req, res) => {
    const querry = "SELECT * FROM users"
    db.query(querry, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// SELECT COUNT(*) FROM users;
app.get("/count", (req, res) => {
    const querry = "SELECT COUNT(*) FROM users"
    db.query(querry, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Check Login
app.get("/login/:username/:password", (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    const values = [username, password];

    db.query(query, values, (err, data) => {
        if (err) {
            return res.json(err);
        }

        if (data.length === 1) {
            // User exists with the provided username and password
            console.log("successful login")
            return res.json("Login successful");
        } else {
            // No user found with the provided credentials
            return res.json("Login failed");
        }
    });
});





// only admin can post with isAdmin
app.post("/users", (req, res) => {
    const querry = "INSERT INTO users (`username`, `password`, `isAdmin`) VALUES (?)"
    // console.log("req: ",req.body)
    const values = [
        req.body.username,
        req.body.password,
        req.body.isAdmin
    ];

    db.query(querry, [values], (err, data) => {
        if (err) {
            console.log("values:", values)
            //console.log("error here\n",err)
            return res.json(err)
        }

        // else
        return res.json("User has been created succesfully")
    })
})

// This is for sign up
app.post("/signup", (req, res) => {
    const querry = "INSERT INTO users (`idUser`,`username`, `password`) VALUES (?)"
    console.log("req: ", req.body)
    const values = [
        req.body.idUser,
        req.body.username,
        req.body.password

    ];

    db.query(querry, [values], (err, data) => {
        if (err) {
            console.log("values:", values)
            //console.log("error here\n",err)


            return res.json(err)
        }

        // else
        return res.json("User has been created succesfully")
    })
})

app.delete("/users/:id", (req, res) => {
    console.log("req params: ", req.params)
    const idUser = req.params.id // not userId
    const querry = "DELETE FROM users WHERE idUser=?"

    db.query(querry, [idUser], (err, data) => {
        if (err) {

            console.log("error here\n", err)
            return res.json(err)
        }

        // else
        return res.json("User has been deleted")
    })
})

app.put("/users/:id", (req, res) => {
    //console.log(req.params)
    const userId = req.params.userId
    const querry = "UPDATE users SET `title` = ?, `username` = ?, `password` = ?, `isAdmin` = ? WHERE userId = ? "
    //console.log(req.body)
    const values = [
        req.body.title,
        req.body.username,
        req.body.password,
        req.body.isAdmin
    ];

    //console.log(values)

    db.query(querry, [...values, userId], (err, data) => {
        if (err) {
            // console.log("values:",values)
            //console.log("error here\n",err)
            return res.json(err)
        }

        // else
        return res.json("User has been updated")
    })
})


// Edit username
app.put("/admin/:id/:newUsername/:oldusername", (req, res) => {

    const idUser = req.params.id;
    const newUsername = req.params.newUsername;
    const oldusername = req.params.oldusername;
    const query = "UPDATE users SET `username` = ? WHERE idUser = ?";
    const values = [newUsername, idUser];

    db.query(query, values, (err, data) => {
        if (err) {
            return res.json(err);
        }

        // After updating the username, you can also update the image file name.

        //'../my-app/src/uploadstest
        const oldImagePath = `../my-app/src/uploadstest/${oldusername}_image.jpeg`;
        const newImagePath = `../my-app/src/uploadstest/${newUsername}_image.jpeg`;


        fs.rename(oldImagePath, newImagePath, (err) => {
            if (err) {
                return res.json(err);
            }
            return res.json("User has been updated");
            console.log("User have been updated")
        });
    });




});



app.listen(8800, () => {
    console.log("connected to backend")
})

/*Course part*******************************************************************************************************/
app.get("/users/course", (req, res) => {
    const querry = "SELECT * FROM courses"
    db.query(querry, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// increase capacity +1 from that course
app.put("/users/course/register/:coursename", (req, res) => {

    const coursename = req.params.coursename

    const querry = `UPDATE courses SET registered = registered + 1 WHERE shortname in ("${coursename}");`

    db.query(querry, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })

})

// decrease course capacity -1
app.put("/users/course/drop/:coursename", (req, res) => {

    const coursename = req.params.coursename

    const querry = `UPDATE courses SET registered = registered - 1 WHERE shortname in ("${coursename}");`

    db.query(querry, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })

})

// only admin can add *course* 
app.post("/admin/course/add", (req, res) => {

    const querry = "INSERT INTO courses (`fullname`, `shortname`, `capacity`,`day`, `hour`, `description`) VALUES (?)"
    //console.log("req: ",req.body)

    /**
     SENT DATA İS THİS:
     
    {

        "courseName": "test",
        "shortName": "test",
        "capacity": "32",
        "courseDescription": "test Descr",
        "day": "Monday",
        "resultHour": "8:30-10:30"

    }
    **/

    const values = [
        req.body.courseName,
        req.body.shortName,
        req.body.capacity,
        req.body.day,
        req.body.resultHour,
        req.body.courseDescription,
    ];

    db.query(querry, [values], (err, data) => {
        if (err) {
            console.log("values:", values)
            //console.log("error here\n",err)
            return res.json(err)
        }

        else {
            // Querry Two for adding course to Student_Course_Table for registering
            // ALTER TABLE student_course_table ADD COLUMN tempCourse TinyInt(1) DEFAULT 0;
            const second_querry = `ALTER TABLE student_course_table ADD COLUMN ${req.body.shortName} TinyInt(1) DEFAULT 0;`
            db.query(second_querry, (err, data) => {
                if (err) return res.json(err)
                // ELSE
                console.log(`Course (${req.body.courseName}) has been created succesfully`)
            })
            return res.json(`Course (${req.body.courseName}) has been created succesfully`)
        }

    })


})




/**************************************************************student_course_table************************************************************/


app.get("/users/course/registered/:username", (req, res) => {
    const student_username = req.params.username
    const querry = `SELECT * FROM student_course_table WHERE student_username in ("${student_username}");`
    db.query(querry, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


//add user to the table
app.post("/users/course/:username", (req, res) => {
    const student_username = req.params.username
    //INSERT INTO `members` (`contact_number`)  VALUES ("");
    const querry = "INSERT INTO student_course_table (`student_username`) VALUES (?)"
    const value = student_username;
    db.query(querry, value, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// register user to certain course
app.post("/users/course/register/:student_username/:coursename", (req, res) => {


   // UPDATE student_course_table SET py = 1 WHERE student_username in ("t");

    const student_username = req.params.student_username
    const courseShortName = req.params.coursename

    console.log("student_username: ",student_username, " coursename: ",courseShortName)
   
    const querry = `UPDATE student_course_table SET ${courseShortName} = 1 WHERE student_username in ("${student_username}")`
    db.query(querry, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })

    
})

// drop course from certain user
app.post("/users/course/drop/:student_username/:coursename", (req, res) => {


    // UPDATE student_course_table SET py = 0 WHERE student_username in ("t");
 
     const student_username = req.params.student_username
     const courseShortName = req.params.coursename
 
     console.log("student_username: ",student_username, " coursename: ",courseShortName)
    
     const querry = `UPDATE student_course_table SET ${courseShortName} = 0 WHERE student_username in ("${student_username}")`

     db.query(querry, (err, data) => {
         if (err) return res.json(err)
         return res.json(data)
     })
 
     
 })
