import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Parent', 'Vendor', 'Guest', 'Alumni'], 
    required: true 
  },
  purpose: { type: String, required: true },
  status: { type: String, enum: ['In', 'Out'], default: 'In' },
  entryTime: { type: Date, default: Date.now }
});

// Indexing for search performance optimization
visitorSchema.index({ category: 1 });
visitorSchema.index({ status: 1 });

const Visitor = mongoose.model('Visitor', visitorSchema);
export default Visitor;