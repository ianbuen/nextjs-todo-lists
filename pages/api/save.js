import Item from "../../util/mongoose";

export default async function handler(req, res) {
    
    if (req.method === "POST") {
        const { task, list } = req.body;
        const item = new Item(task);

        const savedItem = await item.save();

        const newList = await Item.find({ category: list });

        if (savedItem === item)
            return res.json({ success: true, list: newList });

        return res.json({ success: false });
    }

    res.json(null);
};