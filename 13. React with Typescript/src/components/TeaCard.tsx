interface teaProp {
    name: string,
    price: number,
    isSpecial?: boolean
}

function TeaCard({name, price, isSpecial = false} : teaProp) {
    return (
        <div>
            <h2>{name} {isSpecial && <span>⭐</span>}</h2>
            <p>{price}</p>
        </div>
    );
}

export default TeaCard;
