import "./styles.css";
import { ReactComponent as StarImage } from "assets/images/star.svg";
import { Review } from "types/review";

type Props = {
  review: Review;
};
const MovieReviewCard = ({ review }: Props) => {
  return (
    <div className="review-main-container">
      <div className="member-name-container">
        <h1>{review.user.name}</h1>
        <div className="star-image-container">
          <StarImage />
        </div>
      </div>
      <div className="post-review-container base-card">
        <p>{review.text}</p>
      </div>
    </div>
  );
};

export default MovieReviewCard;
