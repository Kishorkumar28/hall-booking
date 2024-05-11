const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Sample data structures
let rooms = [];
let bookings = [];

app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Welcome to the Hall booker",
        name:"Hall Booking"
    })
})

// Create a Room API
app.post('/api/rooms/create', (req, res) => {
    const { seats, amenities, price_per_hour } = req.body;
    const room = {
        id: rooms.length + 1,
        seats,
        amenities,
        price_per_hour
    };
    rooms.push(room);
    res.status(201).json({ message: 'Room created successfully', room });
});

// Book a Room API
app.post('/api/rooms/book', (req, res) => {
    const { customer_name, date, start_time, end_time, room_id } = req.body;
    const booking = {
        id: bookings.length + 1,
        customer_name,
        date,
        start_time,
        end_time,
        room_id
    };
    bookings.push(booking);
    res.status(201).json({ message: 'Room booked successfully', booking });
});

// List all Customers with Booked Data API
app.get('/api/customers/all', (req, res) => {
    const customersWithBookings = bookings.map(booking => {
        const room = rooms.find(room => room.id === booking.room_id);
        return {
            customer_name: booking.customer_name,
            room_name: room ? `Room ${room.id}` : 'Unknown Room',
            date: booking.date,
            start_time: booking.start_time,
            end_time: booking.end_time,
            booking_id: booking.id,
            booking_date: new Date().toISOString(), // Example booking date, you can use actual booking date/time here
            booking_status: 'Confirmed' // Example booking status, you can set this dynamically based on actual booking status
        };
    });
    res.status(201).json({customersWithBookings,bookings});
});

// List Customer Booking Count API
app.get('/api/customers/booking-count', (req, res) => {
    const { customer_name, room_name, date, start_time, end_time } = req.query;
    const count = bookings.filter(booking =>
        booking.customer_name === customer_name &&
        booking.room_name === room_name &&
        booking.date === date &&
        booking.start_time === start_time &&
        booking.end_time === end_time
    ).length;
    res.json({ customer_name, room_name, date, start_time, end_time, booking_count: count });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
