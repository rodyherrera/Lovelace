---
sidebar_position: 8
hide_table_of_contents: true
slug: /learning-how-to-use-the-web-application/
---

# Time to learn how to use the web application

It is important that you know each of the functionalities that the application has in detail, despite the fact that the user interface built is quite simple to understand and in the same intuitive way. Next we will analyze part of the elements that make up the interface and what their respective functionality is.

![Lovelace's Website Landing Page](/img/WebApp-Landing.png)

## About the options available at first glance

As you can see, when the site has completed loading, you will have the chat on the left side where you can interact with Ada, while on the right side you have the header of the site along with a couple of options that we will analyze below.

| Option | Description |
| ------ | ------ |
| About | It is located under the header, when you press it you will go to the page that is responsible for disclosing detailed information about the software, including the terms and conditions that you accept when using the service. |
| Donate | At the moment of pressing, you are redirected to the respective page that allows you to make a contribution and donation to the developer of this software. |
| EN ↓ | The content may not necessarily be the one presented in the previous image, depending on the language that your web browser has, you will have one or the other, if you press, you can change the language in which the content of the application is displayed. There are a number of languages ​​available that were presented prior to the time the Client was installed on the network. Consider that if the web client where the platform is accessed does not have a registered translation, the interface in English will be used by default. |
| Reset Chat | As its name says, it allows you to reset the Chat, in this case, in the illustration, the chat located to the right of it does not have any record of any interaction with the AI, so when you press it nothing will happen, In case there is already a chat, if you press then you will restore the chat. |
| My Activity |Every time you interact with the AI, each Prompt you send will be saved along with its respective response, take it as a kind of history that is stored in your web browser using LocalStorage from JavaScript, consider that, when you reset the chat with the previous option presented, the history is not deleted. Anyway, you can remove it manually as will be seen later. |
| Settings | Allows you to open the settings menu, where you can modify the Model to use, the Role you want to assign to the AI, the mode of communication with the server (if you want to use the API or by WebSocket's) and the provider to use. Consider using the default or recommended values. Some configurations are not stable that as a consequence you will not be able to interact with the AI.|

Leaving the options aside, on the left side we have the chat, where in the first instance we will have a welcome message from Ada, where, in turn, we will have some suggestions to be able to ask her and thus obtain an answer. Also, at the bottom, we have the input to start sending prompts and also get a response from the AI. Consider that several elements of the user interface have a Tooltip, which is activated when the mouse passes over it, as is the case of the lower input on the left side, as you can see the Tooltip at the top of it.

## What's behind the settings menu?

![Lovelace's Settings Menu](/img/WebApp-Settings-Menu.png)

As previously presented, the configuration menu will allow us to choose the model to be used when interacting with the AI, as well as the Role, the provider and the communication mode. As a recommendation, you should not modify the model, because most providers only accept GPT-3.5-Turbo and not GPT-4, in case you change the model you may present some inconveniences when interacting with the AI. You can be free to modify the rest of the settings.

| Option | Description |
| ------ | ------ |
| Model | Select the language model you want to use to communicate with the OpenAI service. |
| Role | Modify the role that ChatGPT will have when communicating with you. |
| Communication Mode | Communication with the server can be through WebSocket that allows an almost immediate response, while via API it will take as long as the prompt indicates. |
| Providers | There are different providers to be able to communicate for free with the OpenAI service. Consider that if you select a specific one some of the settings will change, preferably leave it use the Automatic mode. |  

## The history of interactions with Ada

![Lovelace's Historial](/img/WebApp-Historial.png)

As can be seen in the illustration, when making a prompt and obtaining a response from the AI, in the menu located on the left below "My Activity" we can see the interaction record which is isolated by dates. If you press an interaction, you have a Popover which will allow you to delete the interaction from the history, in this case there are two:

- `Who are you?, Why your name is Ada?`:
Hello! I am Ada Lovelace, an AI language model developed by OpenAI. I am named after Ada Lovelace, an English mathematician and writer who is recognized as the world's first computer programmer. I am here to provide assistance and answer any questions you may have about coding, software development, or any other related topics. How can I help you today?


- `What is your Github Repository and your Documentation?`: Thank you for your question! As Ada Lovelace, my Github repository can be accessed at "https://github.com/codewithrodi/Lovelace/". This repository contains the codebase and related files for the development of the Lovelace coding software.For detailed information about using Lovelace and to understand its features and functionalities, you can refer to the official documentation. It is available at "https://lovelace-docs.codewithrodi.com/". The documentation provides comprehensive instructions, explanations, and examples to help you make the most out of Lovelace while ensuring clarity and precision in the information provided.If you have any further inquiries or need assistance, feel free to ask! I'm here to help.

If both are eliminated, the record will obviously be completely eliminated.

Consider that your activity is not being sent at any time to a server and everything is stored locally in your web client.

## A view of design within mobile devices
![Lovelace's Mobile View 1](/img/WebApp-MobileOne.png)
![Lovelace's Mobile VIew 2](/img/WebApp-MobileTwo.png)

Consider that, within the chat, at the top you have the options `Settings - Activity - Reset Chat`, which were previously presented, this menu is hidden when scrolling down, but reappears when scrolling down above (hired to explain how animations work haha), the point is, this is done in order not to clutter up the user interface so much.

In the same way, when scrolling down there is a white scroll progress bar at the top, as can be seen in the images.

In the upper right part there is the menu, where when you open it in the lower left part to the right of the `GPT4FREE` button you can select the language in which you want to see the user interface, also in the upper part of the option you have the remaining options of the menu to be able to navigate.