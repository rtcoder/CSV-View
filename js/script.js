var app = new Vue({
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
        },
        addRow: function () {
            this.values.push([]);
            let size = this.values[0].length;
            for (let i = 0; i < size; i++) {
                this.values[this.values.length - 1].push("");
            }
        },
        removeRow: function (index) {
            this.$delete(this.values, index);
        },
        addColumn: function () {
            for (let i in this.values) {
                this.values[i].push("");
            }
        },
        removeColumn: function (index) {
            for (let i in this.values) {
                this.$delete(this.values[i], index);
            }
        },
        change: function () {
            this.values[1][1] = 'ffff';
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