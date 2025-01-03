import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true }],
    score: { type: Number, required: true, default: 0 }
});

const Team = mongoose.models.Team || mongoose.model('Team', TeamSchema);

export default Team;
