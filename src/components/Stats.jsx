// Stats Component
function Stats({ items }) {
    const numItems = items.length;
  
    if (!items.length)
      return (
        <p 
          className="stats
        "
        >
          <em>Start Adding Items to your packing list 🚀🚀</em>
        </p>
      );
    const numPacked = items.filter((item) => item.packed).length;
    const percentage = Math.round((numPacked / numItems) * 100);
    return (
      <footer className="stats">
        {percentage === 100
          ? "You got everything ready to go ✈"
          : `
          💼 You have ${numItems} items on your list, and you already packed
           ${numPacked}  (${percentage}%)`}
      </footer>
    );
  }

export default Stats