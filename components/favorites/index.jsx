const Favorites = (props)=>{
    const {id, image, title, removeFromFavorites} = props;
    
    return(
        <div className="favorite-item" key = {id}>
            <div>
                <img src={image} alt="alt" />
            </div>
            <button style={theme ? {backroundColor:'#12346b'}:{}} onClick={removeFromFavorites}>No need anymore</button>
        </div>
    );
};

export default Favorites;