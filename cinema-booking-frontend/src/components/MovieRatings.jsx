import React, { useEffect } from 'react';

const MovieRatingComponent = ({movieTitle }) => {  useEffect(() => {
    // Load IMDb rating plugin script
    (function(d, s, id) {
      var js,
        stags = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js';
      stags.parentNode.insertBefore(js, stags);
    })(document, 'script', 'imdb-rating-api');
  }, []); // Empty dependency array ensures the effect runs only once after mounting


  let imdbUserId = "ur116311545"
 // let movieTitle = "tt1877830"

  return (
    <span className="imdbRatingPlugin" data-user={imdbUserId} data-title={movieTitle} data-style="p3">
    <a href={`https://www.imdb.com/title/${movieTitle}/?ref_=plg_rt_1`}>
      <img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png" alt={`${movieTitle} on IMDb`} />
    </a>
  </span>
  );
};

  /*
  return (
    <span className="imdbRatingPlugin" data-user = {imdb_user_id} data-title="tt0372784" data-style="p3">
      <a href="https://www.imdb.com/title/tt0372784/?ref_=plg_rt_1">
        <img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png" alt="Batman Begins (2005) on IMDb" />
      </a>
    </span>
  );
};
*/

export default MovieRatingComponent;
