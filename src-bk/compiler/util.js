export function compileAttributes (context, attributes) {
    const result = [];
    attributes.forEach(attr => {
        result.push(attr.name ? ` ${attr.name}=` : ' ');

        const value = attr.value[0];
        result.push(value.minor === 'quoted' ? `"${value.value}"` : value.value);
    });

    return result.join('');
}
