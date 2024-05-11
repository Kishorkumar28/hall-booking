const express=require('express')
const HTTP_SERVER=express()
// console.log(process.env)
require("./db.js")
//host address
HTTP_SERVER.listen(5000,"localhost",()=>{
    console.log("server started")
})
HTTP_SERVER.use(express.json());

//home
HTTP_SERVER.get('/', (req, res) => {
    return res.status(200).json({
        message: "Welcome to the Hall booker",
        name:"Hall Booking"
    })
})
halls=[
    {
        id:1,
        NoOfSeats: 100,
        amentities: "Air conditioned, Wifi, Pools"
    },
    {
        id:2,
        NoOfSeats: 200,
        amentities: "Air conditioned, Wifi, Pools"
    },
    {

        id:3,
        NoOfSeats: 300,
        amentities: "Air conditioned, Wifi, Pools"
    },
    ]

booking=[]
//For creating hall
HTTP_SERVER.post("/createhall",(request,response)=>{
    return response.status(200).json({
        halls
    })
})

bookings=[
    {   
        customerName: "pandiyan",
        date: "11-1-2024",
        startTime:"01:00",
        endTime:"02:00",
        roomId:1,
        size:"large",
        status: true,
        
    },
    {   customerName: "Joseph",
        date: "12-1-2024",
        startTime:"10:00",
        endTime:"11:00",
        roomId:2,
        size:"medium",
        status: true,
        
        
    },
    {
        customerName: "Jack",
        date: "11-1-2024",
        startTime:"4:00",
        endTime:"5:00",
        roomId:3,
        size:"small",
        status: true,
        
    }
]

HTTP_SERVER.post("/bookroom",(request,response)=>{
    console.log(request.body)
    const { customerName, date, startTime, endTime, roomId,size,status } = request.body;
    console.log(customerName, date, startTime, endTime, roomId)
    if (!customerName || !date || !startTime || !endTime || !roomId) {
        return response.status(400).json({ message: "Missing required data in request body" });
    }
    const [startHours, startMinutes] = startTime.split(":");
    const [endHours, endMinutes] = endTime.split(":");
    const startTimeInMinutes = parseInt(startHours, 10) * 60 + parseInt(startMinutes, 10);
    const endTimeInMinutes = parseInt(endHours, 10) * 60 + parseInt(endMinutes, 10);
    console.log("booking time is:",startTimeInMinutes,endTimeInMinutes)
    // Check room availability based on time
    const isRoomAvailable = bookings.some(book =>
        book.roomId == roomId &&
        book.date == date &&
        (startTimeInMinutes > convertToMinutes(book.endTime) || endTimeInMinutes <= convertToMinutes(book.startTime))
    );
    ;
    
    if (isRoomAvailable) {
        // Proceed with booking
        const newBooking = {
            customerName,
            date: date,
            startTime,
            endTime,
            roomId: bookings.length + 1, // Generate a unique booking ID
            size,
            status: true,
            
            
        };
        bookings.push(newBooking)
        return response.status(201).json({
            message: "Room booked successfully",
            newBooking
        })
        
    }
    else {
        return response.status(400).json({ message: "Room not available for booking" });
    }
})


function convertToMinutes(timeString) {
    const [hours, minutes] = timeString.split(":");
    console.log("Hours and minutes is",hours,minutes)
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    
}



//For Listing rooms with booked data
HTTP_SERVER.get("/bookings",(request,response)=>{
    return response.status(200).json({
        message: "Bookings fetched successfully",
        bookings
    })
})

//customers booking data
customersData=[
    {
        id:1,
        Roomname:"large",
        customerName: "pandiyan",
        Date: "11/1/2024",
        startTime:"9 AM",
        endTime:"3 PM",
        bookingStatus:true
    },
    {
        id:2,
        Roomname:"medium",
        customerName: "Joseph",
        Date: "12/1/2024",
        startTime:"9 AM",
        endTime:"3 PM",
        bookingStatus:true
    },
    {
        id:3,
        Roomname:"small",
        customerName: "Jack",
        Date: "11/1/2024",
        startTime:"4 PM",
        endTime:"9 PM",
        bookingStatus:true
    }
]
HTTP_SERVER.get("/bookings/customersdata",(request,response)=>{
    console.log("PARAMS", request.params);
    return response.status(200).json({
        message: "Customers data fetched successfully",
        customersData
    })
})

//How many times a customer booked rooms
customerBookings=[
    {
        id:1,
        Roomname:"large",
        status: true,
        customerName: "pandiyan",
        Date: "11/1/2024",
        startTime:"9 AM",
        endTime:"3 PM",
        bookingId:1,
        bookingDate:"11/1/2024",
        bookingStatus:true

    },
    {
        id:2,
        name:"medium",
        status: true,
        customerName: "Joseph",
        Date: "12/1/2024",
        startTime:"9 AM",
        endTime:"3 PM",
        bookingId:2,
        bookingDate:"12/1/2024",
        bookingStatus:true
    },
    {
        id:3,
        name:"small",
        status: true,
        customerName: "Jack",
        Date: "11/1/2024",
        startTime:"4 PM",
        endTime:"9 PM",
        bookingId:3,
        bookingDate:"11/1/2024",
        bookingStatus:true
    }
]
HTTP_SERVER.get("/bookings/:id",(request,response)=>{
    return response.status(200).json({
        message: "Bookings fetched successfully",
        customerBookings
    })
})


console.log(halls)