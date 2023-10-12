import {useContext} from "react";

const RecipeItem = (props) => {
    const {id, image, title, addToFavorites} = props;
    
    return(
        <div className="recipe-item" key={id}>
      <div>
        <img src={image} alt="alt" />
      </div>
      <button onClick={addToFavorites}>Like me</button>
    </div>
  );
};

export default RecipeItem;



