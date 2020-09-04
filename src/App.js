import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const apiUrl = "https://go-url-shortener.herokuapp.com"
// const apiUrl = "http://localhost:8080"

function App() {
    const [original, setOriginal] = useState('')
    const [shorten, setShorten] = useState('')
    const [receieveUrl, setReceieveUrl] = useState('')
    const [isCopy, setIsCopy] = useState(false)

    useEffect(() => {
        let pathname = window.location.pathname.slice(1)
        if (pathname !== '') {
            getOriginalUrl(pathname)
        }
    })

    function getOriginalUrl(shortUrl) {
        const configGet = {
            method: 'get',
            url: `${apiUrl}/api/shorten/${shortUrl}/to/original-url`,
            headers: {
                'Content-Type': 'application/json',
            },
        }

        axios(configGet)
            .then(
                (response) =>
                    response.status === 200 &&
                    window.location.replace(response.data.OriginalUrl)
            )
            .catch((error) => console.log(error))
    }

    function onShorten() {
        let FormData = require('form-data')
        let data = new FormData()

        const config = {
            method: 'post',
            url: apiUrl + '/api/shorten-url',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        }
        data.append('url', original)
        data.append('custom_url', shorten)
        axios(config)
            .then(function (response) {
                let fullShortenUrl =
                    'https://turl.netlify.app/' + response.data.ShortenUrl
                setReceieveUrl(fullShortenUrl)
                setIsCopy(false)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function onChangeOriginalUrl(e) {
        setOriginal(e.target.value)
    }

    function onChangeShortenUrl(e) {
        setShorten(e.target.value)
    }

    function onCopy() {
        setIsCopy(true)
        /* Get the text field */
        let copyText = document.getElementById("shorten-url");
      
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/
      
        /* Copy the text inside the text field */
        document.execCommand("copy");
        console.log("copy: ", copyText.value)
    }

    return (
        <div className="main">
            <header>
                <h1 className="h1">
                    <a href="/">tiny url</a>
                </h1>
                <div className="form">
                    <input
                        value={original}
                        type="url"
                        id="urlinput"
                        placeholder="Put Your Long URL Here"
                        onChange={(e) => onChangeOriginalUrl(e)}
                    />
                    <div>
                        <input
                            value={shorten}
                            type="text"
                            maxLength="10"
                            placeholder="Custom URL (Optional)"
                            onChange={(e) => onChangeShortenUrl(e)}
                        />
                        <p style={{ color: 'red' }}></p>
                    </div>
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={onShorten.bind(this)}>
                        {' '}
                        🔗 Shorten Me
                    </button>
                </div>
                <div
                    className="form"
                    style={{ marginBottom: '0px !important' }}>
                    <div>
                        <input
                            id="shorten-url"
                            value={receieveUrl}
                            type="text"
                            placeholder="Your Short Url Shown here"
                        />
                        <p style={{ color: 'cyan' }}></p>
                    </div>
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={onCopy.bind(this)}>
                        {isCopy ? 'Copied' : 'Copy shorten link'}
                    </button>
                </div>
                <footer className="infos">
                    <p className="small-text" style={{ color: 'grey' }}>
                        Please Don't Shorten Sensitive Information! We are not
                        responsible for any damage made
                    </p>
                </footer>
            </header>
        </div>
    )
}

export default App
