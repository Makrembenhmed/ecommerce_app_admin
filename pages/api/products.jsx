import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function Handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === "POST") {
        const { title, description, price,images } = req.body;

        try {
            const productDoc = await Product.create({ title, description, price,images });
            res.status(201).json(productDoc); // Send HTTP 201 Created status and the created product            
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({ error: "Internal Server Error" }); // Send HTTP 500 Internal Server Error status
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" }); // Send HTTP 405 Method Not Allowed status for unsupported methods
    }
    if (method==="DELETE") {
        if(req.query.id){
            await Product.deleteOne(_id==req.query.id)
            res.json(true)
        }
    }
}
