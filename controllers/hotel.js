import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("hotel deleted");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
try{
    const hotel =await Hotel.findById(req.params.id) //
    res.status(200).json(hotel)

} catch(err){
    res.status(500).json(err)
}
}
export const getHotels = async (req, res, next) => {
try{
    const hotels =await Hotel.find(); 
    res.status(200).json(hotels)

} catch(err){
    next(err)
}
}
export const countByCity = async (req, res, next) => {
  const cities=req.query.cities.split(",")
  try{
      const list= await Promise.all(cities.map(city=>{
        return Hotel.countDocuments({city:city})
      }))
      const data = list; // Assign the list to the data variable
        

      res.status(200).json(data)
   
  } catch(err){
      next(err)
  }
  }
  
