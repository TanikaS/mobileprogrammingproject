<div className="items">
    {recipes && recipes.length > 0 ? recipes.map((item) => <RecipeItem id={item.id}/>)
    :null}
</div>