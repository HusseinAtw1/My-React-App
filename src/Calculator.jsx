    import react, {useState, useEffect} from 'react';
    import Button from './button';
    function evaluate(tokens) {
        let i = 0;
        while(true){
            if(tokens[i] === '*') {
                let temp = Number(tokens[i - 1]) * Number(tokens[i + 1]);
                tokens[i] = temp;
                tokens.splice(i - 1, 3, temp);
                i--;
                continue;
            } else if(tokens[i] === '/') {
                let temp = Number(tokens[i - 1]) / Number(tokens[i + 1]);
                tokens[i] = temp;
                tokens.splice(i - 1, 3, temp);
                i--;
                continue;                        
            }
            i++;
            if (i === tokens.length) break;
        }
        i = 0;
        while(i < tokens.length) {
            if(tokens[i] === '+') {
                let temp = Number(tokens[i - 1]) + Number(tokens[i + 1]);
                tokens[i] = temp;
                tokens.splice(i - 1, 3, temp);            
                i--;
                continue;
            } else if (tokens[i] === '-') {
                let temp = Number(tokens[i - 1]) - Number(tokens[i + 1]);
                tokens[i] = temp;
                tokens.splice(i - 1, 3, temp);
                i--;
                continue;                       
            }
            i++;
        } 
        
        return tokens[0];
    }

    function Calculator(){

        const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

        const operators = ['*', '/', '+', '-'];

        const[input, setInput] = useState('');
        
        const [calculated, setCalculated] = useState(false);

        useEffect(() => {
            if (calculated) {
                document.title = "Calculation Complete!";
                const timer = setTimeout(() => setCalculated(false), 500);
                return () => clearTimeout(timer);
            }
        }, [calculated]);

        const onClick = (value) => {
            if (numbers.includes(value)) {
                setInput(prevInput => {
                    const newInput = prevInput + value;
                    console.log('Input: ' + newInput);
                    return newInput 
                });
            }
            else if(operators.includes(value)) {
                switch (value) {
                    case '+':
                        setInput(prevInput => prevInput + '+');
                        break;
                    case '-':
                        setInput(prevInput => prevInput + '-');
                        break;
                    case '*':
                        setInput(prevInput => prevInput + '*');
                        break;
                    case '/':
                        setInput(prevInput => prevInput + '/');
                        break;
                    default:
                        break;
                }  
            }
            else if(value === '=') {
                setInput(prevInput =>{
                    const tokens = prevInput.match(/\d+|\+|\-|\*|\//g);
                    const newInput = evaluate(tokens).toString();
                    console.log(newInput)
                    return newInput;
                });
                setCalculated(true);
            }
            else if(value === 'C') {
                setInput('');
            }
        }

        return(
            <div className='calculator-container'>
                <div className="display">{input || 0}</div>
                <div className='numbers'>
                    {numbers.map((nums) => (<Button value={nums} key={nums} className='nums' onClick={onClick}></Button>))}
                </div>
                <div className='operators'>
                    {operators.map((op) => (<Button value={op} key={op} className='ops' onClick={onClick}></Button>))}
                </div>
                <div className='special-operators'>
                    <Button value="C" className="clear" onClick={onClick} />
                    <Button value="=" className="equals" onClick={onClick} />
                </div>
            </div>
        );

    }

    export default Calculator   