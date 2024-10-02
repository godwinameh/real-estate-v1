import { Link } from "react-router-dom";
import Slider from "../components/Slider";

function Explore() {
    return (
        <div className="explore">
            <header>
                <p className="pageHeader">Explore</p>
            </header>

            <main>
                <Slider />

                <p className="exploreCategoryHeading">Categories</p>
                <div className="exploreCategories">
                    <Link to="/category/rent">
                        <img
                            src="/public/assets/jpg/rentCategoryImage.jpg"
                            alt="rent"
                            className="exploreCategoryImg"
                        />
                        <p className="exploreCategoryName">Places for rent</p>
                    </Link>
                    <Link to="/category/sale">
                        <img
                            src="/public/assets/jpg/sellCategoryImage.jpg"
                            alt="sell"
                            className="exploreCategoryImg"
                        />
                        <p className="exploreCategoryName">Places for sale</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default Explore;
