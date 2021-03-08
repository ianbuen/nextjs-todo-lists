import Item from "../../util/mongoose";

export default async function handler(req, res) {

    if (req.method === "PUT") {

        const { task } = req.body;

        const result = await Item.replaceOne({ _id: task._id }, { ...task });

        if (result.nModified)
            return res.json({ success: true});

        return res.json({ success: false });
    }

    res.json(null);
}