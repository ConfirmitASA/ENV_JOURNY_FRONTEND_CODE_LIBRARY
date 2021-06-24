import makeCloudLayout from './cloud';
import {takeDataFromTable} from "./data";

let request = new XMLHttpRequest();
request.onreadystatechange = () => {
    if (request.readyState === 4) {
        if (request.status === 200) {
            const parser = new DOMParser();
            const tDocument = parser.parseFromString(request.responseText, "text/html");

            const table = tDocument.getElementById("confirmit_agg_table");
            table.style.display = 'none';
            const body = document.getElementsByTagName('body')[0];
            body.appendChild(table);

            const data = takeDataFromTable({
                elementId: "confirmit_agg_table",
                countId: 1,
                // sentimentId: 2
            });
            const selectContainer = document.createElement('div');
            selectContainer.id = 'exceptions';
            const select = document.createElement('select');
            select.setAttribute('multiple', 'true');
            data.forEach((item, index) => {
                const option = document.createElement('option');
                option.text = item.text.toUpperCase();
                select.add(option, index);
            });
            selectContainer.appendChild(select);
            body.appendChild(selectContainer);

            const {restart: restartCloud} = makeCloudLayout({
                elementFromId: "confirmit_agg_table",
                elementToId: "cloud",
                exceptionsFromId: "exceptions",
                countId: 1,
                // sentimentId: 2,
                clickFunc: () => {
                    alert("hello");
                },
                // colorConfig: {
                //     limiters: [-5, -1, 1, 5],
                //     colors: ['#FF0000', '#FFED00', '#008000']
                // }
            });

            const applyButton = document.createElement('button');
            applyButton.innerText = 'Apply';
            applyButton.style.marginLeft = '10px';
            applyButton.onclick = () => {
                restartCloud();
            };
            body.appendChild(applyButton);
        }
    }
};

request.open('GET', 't3.html', true);
request.send();