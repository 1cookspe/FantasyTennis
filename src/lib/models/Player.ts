import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
    name: {
		type: String,
		required: true,
		unique: true,
	},
	eliminated: {
		type: Boolean,
		required: true,
		default: false,
	},
	round: {
		type: String,
		required: true,
		default: "1R",
		enum: ["1R", "2R", "3R", "4R", "QF", "SF", "F", "W"],
		trim: true,
		uppercase: true
	},
	ranking: {
		type: Number,
		required: true,
	},
	draw: {
		type: String,
		required: true,
		enum: ["M", "W"],
		trim: true,
		uppercase: true
	}
});

export interface PlayerDocument extends Document {
    name: string;
    eliminated: boolean;
    round: string;
    ranking: number;
    draw: string;
}

const Player = mongoose.models.Player || mongoose.model('Player', PlayerSchema);

export default Player;
