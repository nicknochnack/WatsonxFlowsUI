# WxFlows UI
Leverage the public preview of watsonx flows using a React/Express/Node User Interface

## See it live and in action 📺
<img src="https://i.imgur.com/Rfyf53Y.png"/>

# Deploying a Flow 🚀
1. Download the CLI, this will be used to deploy your flow: `https://watzen.ibm.stepzen.com/docs/installation`
2. Install it from a terminal using Python Package Manager `pip install wxflows_cli-1.0.0rc87-py3-none-any.whl --force-reinstall`
3. Check it's installed and works by checking the version: `wxflows --version`
4. Grab Environment, Domain and Admin Key variables from here: `https://watzen.ibm.stepzen.com/` and add them to the `.env` when deploying your flow Note, you'll need these for the environment file for the application as well </br>
- ENVIRONMENT= // from stepzen url above
- DOMAIN= // from stepzen url above
- ADMIN_KEY= // from stepzen url abve
- STEPZEN_WATSONX_HOST=shared  // use shared, this is the default
5. Login to wxflows: `wxflows login`
6. Check your authenticated: `wxflows whoami`
7. Setup new project: `wxflows init --interactive` </br>
<b>OPTIONAL:</b> Rechunking `wxflows data build --data-directory ./watsonxdocs --chunk-overlap 25 --chunk-size 250 --data-type md --force`
9. Deploy collection `wxflows collection deploy`
10. Uncomment the flows in `wxflows.toml` </br> 

<b>Example:</b> </br>
flows="""</br>
    // myPrompt = ragAnswerInput | topNDocs | promptFromTopN | ragInfo </br>
    // myRag = ragAnswerInput | topNDocs | promptFromTopN | completion(parameters:myRag.parameters) | ragInfo </br>
    myRagWithGuardrails = ragAnswerInput | topNDocs | promptFromTopN | completion(parameters:myRagWithGuardrails.parameters) | ragScoreInfo | hallucinationScore | ragScoreMessage | ragInfo //THIS LINE IS NOW UNCOMMENTED </br>
"""

11. Deploy the flow itself `wxflows flows deploy` > you'll get your api endpoint back


# Running the App 
1. Update the environment variables in the .env within the app directory. Leave PORT, CLIENT_URL and DOMAIN_URL the same. 
2. Update the api endpoint inside of `flowController.js`
3. From the app directory run `npm run dev`. The app should spin up at localhost:3000 

</br>
# Other References 🔗
<p>-<a href="https://www.ibm.com/products/watsonx-ai/flows-engine">Flows Engine</a>:home page for flows engine.</p>
<p>-<a href="https://watzen.ibm.stepzen.com/">Flows Engine Documentation</a>:need help, check here!</p>


# Who, When, Why?

👨🏾‍💻 Author: Nick Renotte <br />
📅 Version: 1.x<br />
📜 License: This project is licensed under the MIT License </br>








