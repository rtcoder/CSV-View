new Vue({
    el: '#app',
    data: {
        isConverted: false,
        csvContent: null,
        values: [],
        delimiter: ","
    },
    methods: {
        edit: function (i, j, event) {
            this.values[i][j] = event.currentTarget.innerHTML;
            console.log('edycja', this.values);
        },
        addRow: function () {
            this.values.push([]);
            let size = this.values[0].length;
            for (let i = 0; i < size; i++) {
                this.values[this.values.length - 1].push("");
            }
            console.log('nowy wiersz', this.values);
        },
        removeRow: function (index) {
            this.values.splice(index, 1);
            console.log('usunięcie wiersza ' + index, this.values);
            this.$forceUpdate();
        },
        addColumn: function () {
            for (let i in this.values) {
                this.values[i].push("");
            }
            console.log('nowa kolumna', this.values);
        },
        removeColumn: function (index) {

            for (let i in this.values) {
                this.values[i].splice(index, 1);
            }
            console.log('usunięcie kolumny ' + index, this.values);
            this.$forceUpdate();
        }
    },
    watch: {
        csvContent: function () {
            let arr = this.csvContent
                    .trim()
                    .split('"')
                    .map(function (v, i) {
                        return i % 2 === 0 ? v : v.replace(',', '[comma]');
                    })
                    .join('"')
                    .split("\n");
            let max = 0;
            this.values = [];
            for (let i in arr) {
                let tmparr = arr[i].split(',');
                if (max < tmparr.length) {
                    max = tmparr.length;
                }
                if (max > tmparr.length) {
                    let countDiff = max - tmparr.length;
                    for (let j = 0; j < countDiff; j++) {
                        tmparr.push("");
                    }
                }


                for (let k in tmparr) {
                    tmparr[k] = tmparr[k].replace('[comma]', ',');
                }
                this.values.push(tmparr);
            }



            this.isConverted = true;


        }
    }
});