
        const units = {
            length: {
                cm: { name: 'Centimeter', toBase: 0.01 },
                m:  { name: 'Meter', toBase: 1 },
                km: { name: 'Kilometer', toBase: 1000 }
            },
            weight: {
                mg: { name: 'Milligram', toBase: 0.001 },
                g:  { name: 'Gram', toBase: 1 },
                kg: { name: 'Kilogram', toBase: 1000 }
            },
            temperature: {
                c: { name: 'Celsius' },
                f: { name: 'Fahrenheit' },
                k: { name: 'Kelvin' }
            }
        };

        const dimensionSelect = document.getElementById('dimension-select');
        const fromUnitSelect = document.getElementById('fromUnitSelect');
        const toUnitSelect = document.getElementById('toUnitSelect');
        const inputValue = document.getElementById('inputValue');
        const outputValue = document.getElementById('outputValue');
        const swapButton = document.getElementById('swapButton');

        function populateUnitSelectors(dimension) {

            const dimensionUnits = units[dimension];
            fromUnitSelect.innerHTML = '';
            toUnitSelect.innerHTML = '';
            const unitKeys = Object.keys(dimensionUnits);

            unitKeys.forEach(key => {
                const unit = dimensionUnits[key];

                const fromOption = document.createElement('option');
                fromOption.value = key;
                fromOption.textContent = unit.name;
                fromUnitSelect.appendChild(fromOption);
                const toOption = fromOption.cloneNode(true);
                toUnitSelect.appendChild(toOption);
            });

            fromUnitSelect.value = unitKeys[0]; 
            toUnitSelect.value = unitKeys[1]; 
            convert();
        }

        function convert() {
            const dimension = dimensionSelect.value;
            const fromUnit = fromUnitSelect.value;
            const toUnit = toUnitSelect.value;
            const value = parseFloat(inputValue.value);
            if (isNaN(value)) {
                outputValue.value = '';
                return;
            }

            let result;

            // Calculation Logic
            if (dimension === 'temperature') {
                result = convertTemperature(value, fromUnit, toUnit);
            } else {
                const fromFactor = units[dimension][fromUnit].toBase;
                const valueInBaseUnit = value * fromFactor;
                const toFactor = units[dimension][toUnit].toBase;
                result = valueInBaseUnit / toFactor;
            }
            outputValue.value = parseFloat(result.toFixed(10));
        }

        function convertTemperature(value, from, to) {
            if (from === to) return value;

            let valueInCelsius;

            switch (from) {
                case 'f':
                    valueInCelsius = (value - 32) * (5/9);
                    break;
                case 'k':
                    valueInCelsius = value - 273.15;
                    break;
                case 'c':
                    valueInCelsius = value;
                    break;
            }

            switch (to) {
                case 'f':
                    return (valueInCelsius * (9/5)) + 32;
                case 'k':
                    return valueInCelsius + 273.15;
                case 'c':
                    return valueInCelsius;
            }
        }

        function swapUnits() {
            const fromValue = fromUnitSelect.value;
            const toValue = toUnitSelect.value;
            fromUnitSelect.value = toValue;
            toUnitSelect.value = fromValue;
            convert();
        }

        dimensionSelect.addEventListener('change', () => {
            populateUnitSelectors(dimensionSelect.value);
        });

        inputValue.addEventListener('input', convert);

        fromUnitSelect.addEventListener('change', convert);
        toUnitSelect.addEventListener('change', convert);

        swapButton.addEventListener('click', swapUnits);

        populateUnitSelectors(dimensionSelect.value);