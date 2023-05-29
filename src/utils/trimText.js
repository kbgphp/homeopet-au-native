export default ( length,text ) => {
    const text_length = text.length;
    const tempText = text.substring(0, length);
    let modText;
    if (text_length > length) {
        const lastSpace = tempText.lastIndexOf(' ');
        modText = tempText.substring(0, lastSpace).concat(' ...');
    }
    return (
        (text_length > length) ? modText : text
    )
}
