import React, { useState, useEffect } from "react"; 
import axios from "axios";
import useDarkMode from "../useDarkMode";
import backgroundImage from "../assets/cc-images/coins-2.jpg";

const HomePage = () => {
    const { darkMode, setDarkMode } = useDarkMode();
    const [exchangeRates, setExchangeRates] = useState({});
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState('1');
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [loading, setLoading] = useState(true);
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
        } else {
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
        <div className="flex justify-center items-center max-w-4xl mx-auto p-20 min-h-screen bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${backgroundImage})`}}>
            <div className="w-full">
            <div className="container mx-auto p-4 bg-white/75 dark:bg-gray-900 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center mb-4">Currency Converter</h1>

                {/* Darkmode toggle button*/}
                <div className="mb-6 flex justify-center">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="bg-gray-800 text-white px-4 rounded-md"
                    >
                        Toggle {darkMode ? "Light" : "Dark"} Mode
                    </button>
                </div>

                {/*show loading message while fetching data */}
                {loading && <p className="text-center">Loading exchange rates...</p>}
                {error && <p className="text-center text-red-500">{error}</p>} {/*show error message*/}

                {/*show form once data is loaded and there is no error */}
                {!loading && !error && (
                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        {/* From currency selector */}
                            <div className="w-full max-w-xs">
                                <label htmlFor="from-currency" className="block text-black font-semibold text-2xl text-left">
                                    From:
                                </label>
                                <select 
                                    id="from-currency"
                                    value={fromCurrency}
                                    onChange={(e) => setFromCurrency(e.target.value)}
                                    className="border p-2 rounded-md w-full mb-3"
                                >
                                    {Object.keys(exchangeRates).map((currency) => (
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </select>
                            </div>

                    {/* To currency selector */}
                            <div className="w-full max-w-xs">
                                <label htmlFor="to-currency" className="block text-black font-semibold text-2xl text-left">
                                    To:
                                </label>
                                <select
                                    id="to-currency"
                                    value={toCurrency}
                                    onChange={(e) => setToCurrency(e.target.value)}
                                    className="border p-2 rounded-md w-full mb-3"
                                >
                                    {Object.keys(exchangeRates).map((currency) => (
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </select>
                            </div>


                        {/* Amount input */}
                        <div className="w-full max-w-xs">
                            <label htmlFor="amount" className="block text-black font-semibold text-2xl text-left">
                                Amount:
                            </label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="border p-2 rounded-md w-full mb-4"
                                min="1"
                            />
                        </div>

                        {/* Convert button */}
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-full w-full max-w-xs border mb-7"
                        >
                            Convert
                        </button>
                    </form>
                )}

                {/* Display the converted amount */}
                {convertedAmount > 0 && (
                    <div className="mt-4 text-center">
                        <h2 className="text-2xl font-semibold">
                            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
                        </h2>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
};

export default HomePage;
