new Vue({
    el: '#app',
    data: {
        loaded: false,
        isConverted: false,
        csvContent: null,
        values: [],
        delimiter: ','
    },
    methods: {
        edit: function (i, j, event) {
            this.values[i][j] = event.currentTarget.innerHTML;
        },
        addRow: function () {
            this.values.push([]);
            let size = this.values[0].length;
            for (let i = 0; i < size; i++) {
                this.values[this.values.length - 1].push("-");
            }
        },
        removeRow: function (index) {
            this.values.splice(index, 1);
        },
        addColumn: function () {
            for (let i in this.values) {
                this.values[i].push("-");
            }
        },
        removeColumn: function (index) {
            for (let i in this.values) {
                this.values[i].splice(index, 1);
            }
        }
    },
    watch: {
        csvContent: function () {
            let arr = this.csvContent
                    .trim()
                    .split('"')
                    .map(function (v, i) {
                        return i % 2 === 0 ? v : v.replace(',', "&#44;");
                    })
                    .join('"')
                    .split("\n");
            let max = 0;
            this.values = [];
            for (let i in arr) {
                let tmparr = arr[i].split(this.delimiter);
                this.values.push(tmparr);
                if (max < tmparr.length) {
                    max = tmparr.length;
                }
                if (max > tmparr.length) {
                    let countDiff = max - tmparr.length;
                    for (let j = 0; j < countDiff; j++) {
                        tmparr.push("-");
                    }
                }

            }

            this.isConverted = true;
        }
    }
});