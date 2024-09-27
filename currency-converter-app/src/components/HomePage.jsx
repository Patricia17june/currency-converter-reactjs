import React, { useState, useEffect } from "react";
import axios from "axios";
import useDarkMode from "../../useDarkMode";

const HomePage = () => {
    const {darkMode, setDarkMode} =useDarkMode();
    // State to store exchange rates, selected currencies, the amount to convert and converted amount
    const [exchangeRates, setExchangeRates] = useState({});
    const [fromCurrency, setFromCurrency] =useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState('1');
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [loading, setLoading] =  useState(true);
    const [error, setError] = useState(null);
    const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

        //fetch exchange rates fot the selected currency
        useEffect(() => {
        const fetchExchangesRates = async () => {
            try {
                //API request to fetch exchange rates
                const response = await axios.get(
                    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
                );
                //set  exchange rates
                setExchangeRates(response.data.conversion_rates);
                //data loaded
                setLoading(false);
            } catch (error) {
                console.error("Error fetching exchange rates:", error);
                setError("Failed to fetch exchange rates. Please try again later.");
                setLoading(false);
            }
        };
        fetchExchangesRates();
        //refetch when the fromCurrency changes
    }, [fromCurrency, API_KEY]);

    //handle currency conversioon
    const convertCurrency = () => {
        //check if the exchange rate for the selected currency exist
        if (exchangeRates[toCurrency]) {
            //get conversion rrate 
            const rate = exchangeRates[toCurrency];
            //calculate converted amount
            setConvertedAmount(amount * rate);
        } 
        else {
            setError("The conversion rate is not available for the selected currencies.");
        }
    };

    //handles form submission for conversion
    const handleSubmit = (e) => {
        e.preventDefault();
        //convertts when user submit form
        convertCurrency();
    };

    return (
        <div className={`container mx-auto p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-white"}`}>
            <h1>Currency Converter</h1>
            
            {/* Darkmode toggle*/}
            <div className="mb-4">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md"
                    >
                        Toggle {darkMode ? "Light" : "Dark"} Mode
                </button>
            </div>

            {loading && <p>Loading exchange rates...</p>}
            {error && <p className="text-red-500"></p>}
            {!loading && !error && (

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-4">

                      {/*from currency selector*/}
                      <div>
                         <label htmlFor="to-currency" className="block font-semibold">
                             From:
                         </label>
                         <select
                             id="from-currency"
                             value={fromCurrency}
                             onChange={(e) => setFromCurrency(e,target.value)}
                             className="boarder p-2 rounded-md"
                             >
                                {Object.keys(exchangeRates).map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))}
                         </select>
                        </div>

                        {/*to currency selector*/}
                        <div>
                            <label htmlFor="to-currency" className="block font-semibold">
                                To:
                            </label>
                            <select
                                id="to-currency"
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="border p-2 rounded-md"
                                >
                                    {Object.keys(exchangeRates).map((currency) => (
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    {/*amount input*/}
                    <div>
                        <label htmlFor="amount" className="block font-semibold">
                            Amount:
                        </label>
                        <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border p-2 rounded-md w-full"
                        min="1"
                         />
                    </div>

                    {/*a convert button*/}
                    <button
                     type="submit"
                     className="bg-blue-500 text-white px-4 py-2 rounded-md"
                     >
                         Convert
                    </button>
                </form>
            )}

            {/*display the converted amount*/}
            {convertedAmount > 0 && (
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold">
                        {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
                    </h2>
                </div>
            )}
        </div>
    );
  };
  
  export default HomePage;
