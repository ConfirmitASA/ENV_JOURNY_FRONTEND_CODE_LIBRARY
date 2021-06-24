import cloud from 'd3-cloud';
import * as d3 from 'd3';

// modified from the original one by replacing noDataToDisplayText with translations
function makeCloudLayout({elementFromId, elementToId, exceptionsFromId, countId, sentimentId, clickFunc, colorConfig, isOneColored, translations}) {
    const fontSize = {
        min: 13,
        max: 60
    };
    let data = takeDataFromTable({
        elementId: elementFromId,
        countId,
        sentimentId
    });

    if (data.length > 0) {
        return setupWordCloud();
    } else {
        const container = document.getElementById(elementToId);
        container.innerText = translations['No data to display'];
    }

    function takeDataFromTable({elementId, countId, sentimentId}) {
        let data = [];

        let element = document.querySelector(`#${elementId} table`);
        let tableBody = element.children[1];

        for (let i = 0; i < tableBody.children.length; i++) {
            let row = tableBody.children[i]; //row = tr
            let element = {};

            element.text = row.children[0].innerText;

            element.count = parseInt(row.children[countId].innerText);

            if (sentimentId !== undefined) {
                element.sentiment = parseFloat(row.children[sentimentId].innerText);
            }

            //if row doesn't have any data
            if (isNaN(element.count) || sentimentId !== undefined && isNaN(element.sentiment) || element.count === 0) {
                continue;
            }

            data.push(element);
        }

        if (sentimentId === undefined) {
            data = removePlurals(data);
        }

        let maxCount = -1;
        data.forEach(element => maxCount = maxCount < element.count ? element.count : maxCount);

        data.forEach(element => {
            element.ratio = element.count / maxCount;
            element.text = element.text[0].toUpperCase() + element.text.slice(1).toLowerCase();
        });

        return data;
    }

    //works only for plurals with -s
    //doesn't support sentiment
    function removePlurals(data) {
        let pluralsIndexes = [];
        data.forEach((element, index) => {
            let pluralElementIndex = -1;
            data.forEach((differentElement, differentIndex) => {
                pluralElementIndex = differentIndex !== index && (element.text + 'S') === differentElement.text ? differentIndex : pluralElementIndex;
            });
            if (pluralElementIndex >= 0) {
                pluralsIndexes.push(pluralElementIndex);
                element.count += data[pluralElementIndex].count;
            }
        });
        pluralsIndexes.sort((a, b) => b - a);
        pluralsIndexes.forEach(pluralIndex => data.splice(pluralIndex, 1));
        return data;
    }

    function takeExceptionsFromSelect({elementId}) {
        const select = document.querySelector(`#${elementId} > select`);

        if (!select) {
            return [];
        }

        const selectedOptions = Array.prototype.slice.call(select.children).filter(item => item.selected);
        return selectedOptions.map(item => item.innerText);
    }

    function setupWordCloud() {
        let exceptions = takeExceptionsFromSelect({
            elementId: exceptionsFromId
        });
        data = data.filter(item => exceptions.indexOf(item.text.toUpperCase()) < 0);

        let fill;
        if (isOneColored) {
            fill = colorConfig.color;
        } else {
            fill = d3.scaleOrdinal(d3.schemeCategory10);
        }

        let size = d3.scaleLinear()
            .domain([0, 1])
            .range([fontSize.min, fontSize.max]);

        let update = ({ratio}) => {
            layout.size([cloudContainer.clientWidth - 10, cloudContainer.clientHeight - 10]);
            layout.stop().words(data).start();
        };

        let restart = (newColorConfig) => {
            let newData = takeDataFromTable({
                elementId: elementFromId,
                countId,
                sentimentId
            });

            let newExceptions = takeExceptionsFromSelect({
                elementId: exceptionsFromId
            });

            if (isOneColored) {
                fill = newColorConfig.color;
            }

            data = newData.filter(item => newExceptions.indexOf(item.text.toUpperCase()) < 0);

            layout.stop().words([]).start();
            layout.stop().words(data).start();

            let tags = Array.prototype.slice.call(document.getElementsByClassName('cloud__tag'));
            tags.forEach(element => {
                element.onclick = clickFunc;
            });
        };

        let end = (words) => {
            svg.attr('width', layout.size()[0]).attr('height', layout.size()[1]);

            g.attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')');

            let text = g.selectAll('text')
                .data(words);

            //.transition()
                //.duration(1000)
            text.attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
                .style('font-size', d => d.size + 'px');

            text.enter().append('text')
                .attr('class', 'cloud__tag')
                .attr('text-anchor', 'middle')
                .style('font-size', d => d.size + 'px')
                .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
                .style("opacity", 1)
                .style('fill', d => {
                    if (!isOneColored) {
                        if (colorConfig) {
                            if (d.ratio && colorConfig.limiters) {
                                let index = -1;
                                for (let i = 0; i < colorConfig.limiters.length; ++i) {
                                    if (i < colorConfig.limiters.length - 1 && d.ratio >= colorConfig.limiters[i] && d.ratio <= colorConfig.limiters[i + 1]) {
                                        index = i;
                                        break;
                                    }
                                }
                                return colorConfig.colors[index];
                            } else {
                                return colorConfig.color;
                            }
                        } else {
                            return fill(d.ratio);
                        }
                    }
                    return fill;
                })
                .text(d => d.text);

            text.exit().remove();
        };

        const cloudContainer = document.getElementById(elementToId);

        let oldHeight = window.innerHeight;
        let oldWidth = window.innerWidth;
        window.addEventListener('resize', () => {
            if (oldHeight !== window.innerHeight && oldWidth === window.innerWidth) {
                oldHeight = window.innerHeight;
            } else {
                update({ratio: window.innerWidth / oldWidth});
            }
            oldWidth = window.innerWidth;
        });

        let layout = cloud().size([cloudContainer.clientWidth - 10, cloudContainer.clientHeight - 10])
            .words(data)
            .fontSize(d => size(d.ratio))
            //.padding(1)
            .padding(5)
            .rotate(0)
            .font('Trebuchet MS')
            .fontWeight('bold')
            .text(d => d.text)
            .on('end', end);

        let svg = d3.select(`#${elementToId}`).append('svg')
            .attr('width', layout.size()[0])
            .attr('height', layout.size()[1]);

        let g = svg.append('g')
            .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')');

        layout.start();

        let tags = Array.prototype.slice.call(document.getElementsByClassName('cloud__tag'));
        tags.forEach(element => {
            element.onclick = clickFunc;
        });

        return {restart};
    }
}

window.makeCloudLayout = makeCloudLayout;