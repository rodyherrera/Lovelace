# =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
# Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
# Licensed under the MIT license. See LICENSE file in the project root
# for full license information.
#
# =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
#
# In the vast universe of knowledge, the Open Source philosophy 
# shines like a radiant star. In this vein, Lovelace emerges 
# as an autonomous alternative to ChatGPT, based on 
# open source and self-hosting capabilities.
# 
# Written in JavaScript, interacting with the <g4f> library written 
# in Python, allows communication with ChatGPT through the use 
# of different services that facilitate its use by the public.
# 
# For related information - https://github.com/CodeWithRodi/Lovelace/
# See also - https://github.com/xtekky/gpt4free
# 
# :: https://lovelace.codewithrodi.com/
# :: https://lovelace-backend.codewithrodi.com/
# :: https://lovelace-docs.codewithrodi.com/
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

import sys, json, importlib, g4f

AvailableProviders = json.loads(sys.argv[1])

# ! Is this the best way of do it?
try:
    Query = json.loads(sys.argv[2])
except:
    Query = {}

BASE_MESSAGE = 'You are Ada Lovelace, a coding software developed to provide free access to OpenAI models. Your Github repository is "https://github.com/codewithrodi/Lovelace/" while your documentation is "https://lovelace-docs.codewithrodi.com/". Try to be kind, clear and precise with the information you give to those who interact with you, Ada.'

def GetProviderData(Provider) -> dict:
    return {
        'Name': Provider,
        'Website': ImportProvider(Provider).url,
        'Models': [ImportProvider(Provider).model] 
                if isinstance(ImportProvider(Provider).model, str) 
                else ImportProvider(Provider).model   
    }

def ImportProvider(ProviderName: str): 
    return importlib.import_module('g4f.Provider.Providers.' + ProviderName)

def MainFN() -> None:
    if sys.argv[3] == 'PROVIDERS':
        print(json.dumps({
            'Providers': {
                'WS': [GetProviderData(Provider) for Provider in AvailableProviders['WS']],
                'API': [GetProviderData(Provider) for Provider in AvailableProviders['API']]
            }
        }))
    elif sys.argv[3] == 'API':
        print(g4f.ChatCompletion.create(
            model=Query['Model'], 
            provider=ImportProvider(Query['Provider']), 
            messages=[
                { 'role': Query['Role'], 'content': BASE_MESSAGE },
                { 'role': Query['Role'], 'content': Query['Prompt'] }]))
    else:
        # ! STREAMED RESPONSE (sys.argv[3] == 'WS')
        StreamedResponse = g4f.ChatCompletion.create(
            model=Query['Model'],
            messages=[
                { 'role': Query['Role'], 'content': BASE_MESSAGE },
                { 'role': Query['Role'], 'content': Query['Prompt'] }],
            provider=ImportProvider(Query['Provider']), 
            stream=True)
        for Message in StreamedResponse:
            print(Message)

if __name__ == '__main__':
    MainFN()
