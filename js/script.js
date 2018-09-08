String.prototype.lines = function () {
    return this.split(/\r*\n/);
};
String.prototype.lineCount = function () {
    return this.lines().length;
};

var app = new Vue({
    el: '#app',
    data: {
        isConverted: false,
        inputMode: 'file',
        csvContent: null,
        withHeaders: false,
        values: [],
        delimiter: ",",
        files: []
    },
    methods: {
        addRow: function () {
            this.values.push([]);
            let size = this.values[0].length;
            for (let i = 0; i < size; i++) {
                this.values[this.values.length - 1].push({
                    value: '',
                    edited: false,
                    rows: 1
                });
            }
        },
        removeRow: function (index) {
            this.$delete(this.values, index);
        },
        addColumn: function () {
            for (let i in this.values) {
                this.values[i].push({
                    value: '',
                    edited: false,
                    rows: 1
                });
            }
        },
        removeColumn: function (index) {
            for (let i in this.values) {
                this.$delete(this.values[i], index);
            }
        },
        clear: function () {
            this.values = [];
            this.csvContent = null;
            this.isConverted = false;
        },
        keymonitor: function (i, j, event) {
            this.values[i][j].rows = this.values[i][j].value.lineCount();
        },
        toJSON: function () {

        },
        focusRow: function (i, j) {
            for (let row of this.values) {
                for (let column of row) {
                    column.edited = false;
                }
            }
            this.values[i][j].edited = true;
        },
        onFileUpload: function () {
            this.files = this.$refs.cvsFiles.files;
            let $this = this;
            if (this.files.length) {
                for (let file of this.files) {
                    if(file.type !== 'text/csv'){
                        alert("Filee "+file.name+" is not csv file")
                        continue;
                    }
                    let r = new FileReader();
                    r.onload = function (e) {
                        $this.csvContent = e.target.result;
                    };
                    r.readAsText(file);
                }
            }
        }

    },
    watch: {
        csvContent: function () {
            if(!this.csvContent){
                return;
            }
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
                    tmparr[k] = {
                        value: tmparr[k].replace('[comma]', ','),
                        edited: false,
                        rows: 1
                    };
                }
                this.values.push(tmparr);
            }

            this.isConverted = true;
        }
    }
});