import { useEffect, useState } from "react";

const API = import.meta.env.VITE_GIPHY_API;

const FetchGif = ({ gif }) => {
  const [gifImage, setGifImage] = useState("");

  const getGif = async () => {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API}&q=${gif.split(" ").join("")}&limit=1`);
      const { data } = await response.json();

      setGifImage(data[0]?.images?.downsized_medium.url);
    } catch (error) {
        setGifImage("");
    }
  };

  useEffect(() => {
    if (gif) getGif();
    }, [gif]);

  return gifImage;
};

export default FetchGif;
