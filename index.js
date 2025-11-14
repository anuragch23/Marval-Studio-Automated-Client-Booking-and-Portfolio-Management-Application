import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017/photo_studio';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Booking Schema and Model
const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});
const Booking = mongoose.model('Booking', bookingSchema);

// Enquiry Schema and Model
const enquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
const Enquiry = mongoose.model('Enquiry', enquirySchema);

// API Endpoint for bookings
app.post('/api/bookings', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json({ message: 'Booking successfully created!', booking: newBooking });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ message: 'Error saving booking', error: error.message });
    }
});

// API Endpoint for enquiries
app.post('/api/enquiries', async (req, res) => {
    try {
        const newEnquiry = new Enquiry(req.body);
        await newEnquiry.save();
        res.status(201).json({ message: 'Enquiry successfully submitted!', enquiry: newEnquiry });
    } catch (error) {
        console.error('Error saving enquiry:', error);
        res.status(500).json({ message: 'Error saving enquiry', error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});
