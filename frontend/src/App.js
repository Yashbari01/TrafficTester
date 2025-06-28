import React, { useState } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 dark:text-white focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded shadow-lg z-50">
          <a
            href="https://yashbariportfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Portfolio
          </a>
          <a
            href="https://github.com/Yashbari01"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            GitHub
          </a>
          <a href="https://yashbariportfolio.netlify.app/project" target="_blank" rel="noopener noreferrer"
            className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            Live Project
          </a>
        </div>
      )}
    </div>
  );
}

function App() {
  const [form, setForm] = useState({
    url: "",
    method: "GET",
    payload: "{}",
    totalRequests: 10,
    concurrency: 5,
    authHeader: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/api/test", {
        ...form,
        payload:
          form.method === "POST" || form.method === "PUT"
            ? JSON.parse(form.payload)
            : {},
      });
      setResults(res.data.results);
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      setError("Error occurred while testing API: " + err.message);
    }

    setLoading(false);
  };

  const downloadResults = (results) => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'api_test_results.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo / Title */}
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold text-blue-600 dark:text-white">
                {/* API Traffic Tester */}
                <img src="data:image/png;base64,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" />
              </a>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="https://yashbariportfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Portfolio
              </a>
              <a href="https://github.com/Yashbari01" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                GitHub
              </a>
              <a href="https://yashbariportfolio.netlify.app/project" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Live Project
              </a>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 space-y-6">
          <h1 className="text-3xl font-semibold text-center text-blue-700">
            🚀 API Traffic Tester
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">API URL</label>
              <input
                type="text"
                id="url"
                name="url"
                value={form.url}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                placeholder="https://example.com/api"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">Method</label>
                <select
                  id="method"
                  name="method"
                  value={form.method}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                >
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>DELETE</option>
                </select>
              </div>

              <div>
                <label htmlFor="authHeader" className="block text-sm font-medium text-gray-700 mb-1">Authorization Header</label>
                <input
                  type="text"
                  id="authHeader"
                  name="authHeader"
                  value={form.authHeader}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                  placeholder="Bearer your_token_here"
                />
              </div>
            </div>

            {(form.method === "POST" || form.method === "PUT") && (
              <div>
                <label htmlFor="payload" className="block text-sm font-medium text-gray-700 mb-1">Payload (JSON)</label>
                <textarea
                  id="payload"
                  name="payload"
                  rows="4"
                  value={form.payload}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                  placeholder='{"key": "value"}'
                ></textarea>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="totalRequests" className="block text-sm font-medium text-gray-700 mb-1">Total Requests</label>
                <input
                  type="number"
                  id="totalRequests"
                  name="totalRequests"
                  value={form.totalRequests}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="concurrency" className="block text-sm font-medium text-gray-700 mb-1">Concurrency</label>
                <input
                  type="number"
                  id="concurrency"
                  name="concurrency"
                  value={form.concurrency}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Testing...
                </div>
              ) : "Start Test"}
            </button>
          </form>

          {loading && (
            <div className="text-center text-gray-600 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
              Running test... ({results.length}/{form.totalRequests})
            </div>
          )}

          {summary && (
            <div className="mt-4 p-4 bg-green-50 border rounded text-sm text-gray-800">
              <h3 className="font-semibold text-green-700 mb-2">Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Total Requests: {summary.totalRequests}
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Success: {summary.success}
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  Failed: {summary.failed}
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Average Time: {summary.averageTime} ms
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  Min Time: {summary.minTime} ms
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  Max Time: {summary.maxTime} ms
                </div>
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Results</h2>
              <div className="bg-gray-50 border rounded p-4 max-h-[400px] overflow-auto text-sm font-mono">
                <SyntaxHighlighter language="json" style={docco}>
                  {JSON.stringify(results, null, 2)}
                </SyntaxHighlighter>
              </div>
              <button
                className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded"
                onClick={() => downloadResults(results)}
              >
                Download Results
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 py-6 text-center text-gray-600 dark:text-gray-400 text-sm">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-2">
          <a
            href="https://yashbariportfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Portfolio
          </a>
          <span className="hidden md:inline">|</span>
          <a
            href="https://github.com/Yashbari01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Project on GitHub
          </a>
          <span className="hidden md:inline">|</span>
          <a
            href="https://yashbariportfolio.netlify.app/project"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Live Projects
          </a>
        </div>
        <div>
          &copy; {new Date().getFullYear()} API Traffic Tester by <span className="font-medium">Yash Bari</span>. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default App;
