const SongCard = ({userId, albumId, title, description, url, imageUrl}) => {
    return (
        <div className="song-card">
            <img className="image card-image" src={`${imageUrl}`} alt='song artwork' />
            <p className="title card-title">{title}</p> {/*font-size 14px, line-height: 1.4, font-weight 100,
            font-family:Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;*/}
            <p className="userId card-userId">{userId}</p>{/*12px/1.4 Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif*/}
        </div>
    );
};

 export default SongCard;
