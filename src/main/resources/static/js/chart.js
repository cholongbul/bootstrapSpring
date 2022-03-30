$(function () {

    var reqcnt = 0
    var reqcnt2 = 1
    /* ChartJS
     * -------
     * Data and config for chartjs
     */
    runChart()

    function runChart() {
        $.ajax({
            type: "GET",
            url: "getData.do?page=" + reqcnt,
            dataType: "xml",
            //ajax요청
            success: function (xml, textStatus, response) {
                //xml변수선언
                var xmlcnt = response.getResponseHeader("xmlcnt");
                var datanamelist = [];
                var label2d = [];
                var data2d = [];
                var chartname;
                // xml파싱
                $(xml).find("chart").each(function () {
                    chartname = $(this).find("chartname").text();

                    $(this).find("dataset").each(function (i) {
                        var labellist = [];
                        var datalist = [];
                        datanamelist.push($(this).find("dataname").text());
                        $(this).find("item").each(function (i) {
                            datalist.push($(this).find("data").text());
                            labellist.push($(this).find("label").text());
                        });
                        label2d.push(labellist);
                        data2d.push(datalist);
                    });
                });

                console.log(datanamelist);
                console.log(label2d[0]);
                console.log(data2d[0]);
                console.log(datanamelist.length)
                $("#barOrMix-title").text(chartname)
                if (datanamelist.length == 1) {

                    var data = {
                        labels: label2d[0],
                        datasets: [{
                            label: datanamelist[0],
                            data: data2d[0],
                            backgroundColor:
                                'rgba(255, 99, 132, 0.2)',
                            // 'rgba(54, 162, 235, 0.2)',
                            // 'rgba(255, 206, 86, 0.2)',
                            // 'rgba(75, 192, 192, 0.2)',
                            // 'rgba(153, 102, 255, 0.2)',
                            // 'rgba(255, 159, 64, 0.2)'

                            borderColor: 'rgba(255,99,132,1)',
                            // 'rgba(54, 162, 235, 1)',
                            // 'rgba(255, 206, 86, 1)',
                            // 'rgba(75, 192, 192, 1)',
                            // 'rgba(153, 102, 255, 1)',
                            // 'rgba(255, 159, 64, 1)'

                            borderWidth: 1,
                            fill: false
                        }]
                    };
                    $("#barOrMixChart").replaceWith('<canvas id="barOrMixChart" style="height:250px"></canvas>');
                    var barChartCanvas = $("#barOrMixChart").get(0).getContext("2d");
                    // This will get the first returned node in the jQuery collection.
                    var barChart = new Chart(barChartCanvas, {
                        type: 'bar',
                        data: data,
                        options: options
                    });
                } else if (reqcnt == 0) {

                    var multiLineData = {
                        labels: label2d[0],
                        datasets: [{
                            label: datanamelist[0],
                            data: data2d[0],
                            borderColor: [
                                '#587ce4'
                            ],
                            borderWidth: 2,
                            fill: false
                        },
                            {
                                label: datanamelist[1],
                                data: data2d[1],
                                borderColor: [
                                    '#ede190'
                                ],
                                borderWidth: 2,
                                fill: false
                            }
                        ]
                    };
                    $("#barOrMixChart").replaceWith('<canvas id="barOrMixChart" style="height:250px"></canvas>');
                    var multiLineCanvas = $("#barOrMixChart").get(0).getContext("2d");
                    var lineChart = new Chart(multiLineCanvas, {
                        type: 'line',
                        data: multiLineData,
                        options: options
                    });

                } else {
                    var multiLineBarData = {
                        labels: label2d[0],
                        datasets: [{
                            type: 'bar',
                            label: datanamelist[1],
                            data: data2d[1],
                            borderColor: 'rgba(255,99,132,1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderWidth: 1,
                            fill: false
                        },
                            {
                                type: 'line',
                                label: datanamelist[0],
                                data: data2d[0],
                                xAxisID: 'turn-x',
                                yAxisID: 'turn-y',
                                borderColor: [
                                    '#ede190'
                                ],
                                backgroundColor: '#ede190',
                                borderWidth: 2,
                                fill: false,
                                pointStyle: 'circle',
                                pointRadius: 10,
                                pointHoverRadius: 15
                            }
                        ]
                    }
                    var multilineBarOptions = {
                        scales: {
                            yAxes: [{
                                display: true,
                                stacked: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'value-y'
                                },
                                ticks: {
                                    beginAtZero: true
                                },
                                gridLines: {
                                    color: "rgba(204, 204, 204,0.1)"
                                }
                            }, {
                                id: 'turn-y',
                                display: false,
                                scaleLabel: {
                                    display: false,
                                    labelString: "proportion"
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                display: true,
                                stacked: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: 'value-x'
                                },
                                gridLines: {
                                    color: "rgba(204, 204, 204,0.1)"
                                }
                            }, {
                                id: 'turn-x',
                                offset: true,
                                display: false,
                                stacked: false,
                                scaleLabel: {
                                    display: false,
                                    labelString: 'turn-x'
                                }

                            }]
                        },
                        legend: {
                            display: true
                        },
                        elements: {
                            point: {
                                radius: 0
                            }
                        }
                    };
                    $("#barOrMixChart").replaceWith('<canvas id="barOrMixChart" style="height:250px"></canvas>');
                    var multiLineCanvas = $("#barOrMixChart").get(0).getContext("2d");
                    var lineChart = new Chart(multiLineCanvas, {
                        type: 'bar',
                        data: multiLineBarData,
                        options: multilineBarOptions
                    });
                }

                if (reqcnt + 1 == xmlcnt) {
                    reqcnt = 0;
                } else {
                    reqcnt++
                }
            }
        });
    }

    //라인차트 ajax

    setInterval(runChart, 10000);

    'use strict';
    var data = {
        labels: ["2012", "2013", "2014", "2015", "2016", "2017"],
        datasets: [{
            label: '# of Votes',
            data: [10, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            fill: false
        }]
    };
    var multiLineData = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: 'Dataset 1',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: [
                '#587ce4'
            ],
            borderWidth: 2,
            fill: false
        },
            {
                label: 'Dataset 2',
                data: [5, 23, 7, 12, 42, 23],
                borderColor: [
                    '#ede190'
                ],
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Dataset 3',
                data: [15, 10, 21, 32, 12, 33],
                borderColor: [
                    '#f44252'
                ],
                borderWidth: 2,
                fill: false
            }
        ]
    };
    var options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                gridLines: {
                    color: "rgba(204, 204, 204,0.1)"
                }
            }],
            xAxes: [{
                gridLines: {
                    color: "rgba(204, 204, 204,0.1)"
                }
            }]
        },
        legend: {
            display: true
        },
        elements: {
            point: {
                radius: 0
            }
        }
    };


    var doughnutPieData = {
        datasets: [{
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: []
    };

    var doughnutPieOptions = {
        responsive: true,
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };
    var areaData = {
        labels: ["2013", "2014", "2015", "2016", "2017"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            fill: true, // 3: no fill
        }]
    };

    var areaOptions = {
        plugins: {
            filler: {
                propagate: true
            }
        },
        scales: {
            yAxes: [{
                gridLines: {
                    color: "rgba(204, 204, 204,0.1)"
                }
            }],
            xAxes: [{
                gridLines: {
                    color: "rgba(204, 204, 204,0.1)"
                }
            }]
        }
    }

    var multiAreaData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: 'Facebook',
            data: [8, 11, 13, 15, 12, 13, 16, 15, 13, 19, 11, 14],
            borderColor: ['rgba(255, 99, 132, 0.5)'],
            backgroundColor: ['rgba(255, 99, 132, 0.5)'],
            borderWidth: 1,
            fill: true
        },
            {
                label: 'Twitter',
                data: [7, 17, 12, 16, 14, 18, 16, 12, 15, 11, 13, 9],
                borderColor: ['rgba(54, 162, 235, 0.5)'],
                backgroundColor: ['rgba(54, 162, 235, 0.5)'],
                borderWidth: 1,
                fill: true
            },
            {
                label: 'Linkedin',
                data: [6, 14, 16, 20, 12, 18, 15, 12, 17, 19, 15, 11],
                borderColor: ['rgba(255, 206, 86, 0.5)'],
                backgroundColor: ['rgba(255, 206, 86, 0.5)'],
                borderWidth: 1,
                fill: true
            }
        ]
    };

    var multiAreaOptions = {
        plugins: {
            filler: {
                propagate: true
            }
        },
        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                }
            }]
        }
    }

    var scatterChartData = {
        datasets: [{
            label: 'First Dataset',
            data: [{
                x: -10,
                y: 0
            },
                {
                    x: 0,
                    y: 3
                },
                {
                    x: -25,
                    y: 5
                },
                {
                    x: 40,
                    y: 5
                }
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
            ],
            borderWidth: 1
        },
            {
                label: 'Second Dataset',
                data: [{
                    x: 10,
                    y: 5
                },
                    {
                        x: 20,
                        y: -30
                    },
                    {
                        x: -25,
                        y: 15
                    },
                    {
                        x: -10,
                        y: 5
                    }
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }
        ]
    }

    var scatterChartOptions = {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                gridLines: {
                    color: "rgba(204, 204, 204,0.1)"
                }
            }],
            yAxes: [{
                gridLines: {
                    color: "rgba(204, 204, 204,0.1)"
                }
            }]
        }
    }
    var pageNo = 0;
    var numOfrows = 6;
// setInterval(function () {
//
//     console.log(pageNo);
//     $.getJSON('getElectiondata.do?' + '&numOfrows=' + numOfrows, function (data) {
//
//         var sd_name = [];
//         var pplt_cnt = [];
//
//         $.each(data.getCtpvElcntInfoInqire["item"], function (i, item) {
//             if (item["SD_NAME"] != "합계") {
//                 sd_name.push(item["SD_NAME"]);
//                 pplt_cnt.push(item["PPLT_CNT"]);
//             }
//         });
//         console.log(sd_name);
//         console.log(pplt_cnt);
//         doughnutPieData.datasets[0].data = pplt_cnt;
//         doughnutPieData.labels = sd_name;
//
//         if ($("#doughnutChart").length) {
//             $("#doughnutChart").replaceWith('<canvas id="doughnutChart" style="height:250px"></canvas>');
//             var doughnutChartCanvas = $("#doughnutChart").get(0).getContext("2d");
//             var doughnutChart = new Chart(doughnutChartCanvas, {
//                 type: 'doughnut',
//                 data: doughnutPieData,
//                 options: doughnutPieOptions
//             });
//         }
//
//     });
// }, 5000);


// Get context with jQuery - using jQuery's .get() method.


    if ($("#linechart-multi").length) {
        var multiLineCanvas = $("#linechart-multi").get(0).getContext("2d");
        var lineChart = new Chart(multiLineCanvas, {
            type: 'line',
            data: multiLineData,
            options: options
        });
    }

    if ($("#areachart-multi").length) {
        var multiAreaCanvas = $("#areachart-multi").get(0).getContext("2d");
        var multiAreaChart = new Chart(multiAreaCanvas, {
            type: 'line',
            data: multiAreaData,
            options: multiAreaOptions
        });
    }

    if ($("#doughnutChart").length) {
        var doughnutChartCanvas = $("#doughnutChart").get(0).getContext("2d");
        var doughnutChart = new Chart(doughnutChartCanvas, {
            type: 'doughnut',
            data: doughnutPieData,
            options: doughnutPieOptions
        });
    }

    if ($("#pieChart").length) {
        var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
        var pieChart = new Chart(pieChartCanvas, {
            type: 'pie',
            data: doughnutPieData,
            options: doughnutPieOptions
        });
    }

    if ($("#areaChart").length) {
        var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
        var areaChart = new Chart(areaChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
        });
    }

    if ($("#scatterChart").length) {
        var scatterChartCanvas = $("#scatterChart").get(0).getContext("2d");
        var scatterChart = new Chart(scatterChartCanvas, {
            type: 'scatter',
            data: scatterChartData,
            options: scatterChartOptions
        });
    }

    if ($("#browserTrafficChart").length) {
        var doughnutChartCanvas = $("#browserTrafficChart").get(0).getContext("2d");
        var doughnutChart = new Chart(doughnutChartCanvas, {
            type: 'doughnut',
            data: browserTrafficData,
            options: doughnutPieOptions
        });
    }

})
;