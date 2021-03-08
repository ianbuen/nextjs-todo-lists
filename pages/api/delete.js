import Item from "../../util/mongoose";

export default async function handler(req, res) {
    
    if (req.method === "POST") {
        const { taskID } = req.body; 

        const result = await Item.deleteOne({ _id: taskID });

        if (result.deletedCount)
            return res.json({ success: true });

        return res.json({ success: false });
    }

    res.json(null);
};