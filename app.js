const { Socket } = require('dgram');
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

// Set EJS as view engine
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Socket.IO connection event
io.on("connection", function(socket) {
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id, ...data})
    })
   
    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id)
    })
});

// Route for rendering the index page
app.get('/', (req, res) => {
   res.render("index.ejs");
});
app.get('/data',(req,res)=>{
    res.send("hii");
}
)
// Start the server
server.listen(9000, () => {
    console.log("Server is running on http://localhost:9000");
});
