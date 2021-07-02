export function createGridData(height: number, width: number, fillRate: number) {
    let result: object[] = []
    let code = 1
    for (var i = 0; i < width; i++) {
        let column = []
        let visible = 0
        for (var j = 0; j < height; j++) {
            if (Math.random() < fillRate) {
                column.push(code++)
                visible++
            }
            else {
                column.push(0)
            }
        }
        result.push({
            'column': column,
            'visible': visible
        })
    }
    return result
}