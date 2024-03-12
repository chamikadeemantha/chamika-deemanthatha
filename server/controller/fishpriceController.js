import FishPrice from "../model/fishpriceModel.js";
import sendEmail from "../util/sendEmail.js";

//create
export const createfish = async (req, res) => {
  try {
    const fishpriceData = new FishPrice(req.body);

    if (!fishpriceData) {
      return res.status(404).json({ msg: "Fish Price data not found" });
    }

    const savedData = await fishpriceData.save();

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    const message = `
    <p>New Fish Has Been Added to the System</p>
    <p>Added At: ${formattedDate}</p>
    <p>Name- ${fishpriceData.name}</p>
    <p>Species- ${fishpriceData.species}</p>
    <p>Grade- ${fishpriceData.grade}</p>
    <p>Wolesale Price- ${fishpriceData.wolesale_price}</p>
    <p>Retail Price- ${fishpriceData.retail_price}</p>
    <p>Average Weight- ${fishpriceData.average_weight}</p>
    <p>Availability- ${fishpriceData.availability}</p>
    `;

    const subject = "Fish Price Added";
    const sent_to = "chamikade01@gmail.com";
    const sent_from = "chootiputha2001@outlook.com";

    try {
      await sendEmail(subject, message, sent_to, sent_from);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }

    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

//fletching data

export const getAllfish = async (req, res) => {
  try {
    const fishpriceData = await FishPrice.find();
    if (!fishpriceData) {
      return res.status(404).json({ msg: "Fish Price All data not found" });
    }
    res.status(200).json(fishpriceData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//getone

export const getonefish = async (req, res) => {
  try {
    const id = req.params.id;
    const fishpriceExist = await FishPrice.findById(id);

    if (!fishpriceExist) {
      return res.status(404).json({ msg: "Fish Price not found" });
    }
    res.status(200).json(fishpriceExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//update
export const updatefish = async (req, res) => {
  try {
    const id = req.params.id;
    const fishpriceExist = await FishPrice.findById(id);

    if (!fishpriceExist) {
      return res.status(404).json({ msg: "Fish Price not found/cant' update" });
    }

    //updating

    const updatedData = await FishPrice.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    const message = `
    <p>Fish Details Have Been Updated</p>
    <p>Updated At: ${formattedDate}</p>
    <p>Name- ${updatedData.name}</p>
    <p>Wolesale price- ${updatedData.wolesale_price}</p>
    <p>Retail price- ${updatedData.retail_price}</p>
    <p>Average Weight- ${updatedData.average_weight}</p>
    `;

    const subject = "Fish Price Updated";
    const sent_to = "chamikade01@gmail.com";
    const sent_from = "chootiputha2001@outlook.com";

    try {
      await sendEmail(subject, message, sent_to, sent_from);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }

    res.status(200).json(updatedData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

//delete

export const deletefishprice = async (req, res) => {
  try {
    const id = req.params.id;
    const fishpriceExist = await FishPrice.findById(id);

    if (!fishpriceExist) {
      return res.status(404).json({ msg: "Fish Price not found/can't delete" });
    }

    await FishPrice.findByIdAndDelete(id);
    res.status(200).json({ msg: "Fish Details deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
