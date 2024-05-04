import { mongooseConnect } from "@/lib/mongoose";

import { Product } from "@/models/product";

export default async function Handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === "POST") {
        const { title, description, price, images } = req.body;

        try {
            const productDoc = await Product.create({ title, description, price, images });
            res.status(201).json(productDoc); // Send HTTP 201 Created status and the created product            
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({ error: "Internal Server Error" }); // Send HTTP 500 Internal Server Error status
        }
    } else if (method === "PUT") {
        const { title, description, price, images, _id } = req.body;
        await Product.updateOne({ _id }, { title, description, price, images })
        res.json(true)
        console.log("updated")


    } else if (method === "GET") {
        if (req.query?.id) {
            res.json(await Product.findById(req.query.id))
        } else {
            res.json(await Product.find())
        }

    } else if (method === "DELETE") {
        if (req.query?.id) {
            try {
                await Product.deleteOne({ _id: req.query?.id });
                res.json(true);
            } catch (error) {
                console.error("Error deleting product:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        } else {
            res.status(400).json({ error: "Bad Request" }); // Send HTTP 400 Bad Request if no ID provided
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" }); // Send HTTP 405 Method Not Allowed status for unsupported methods
    }
}
