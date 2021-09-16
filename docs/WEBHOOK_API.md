# Webhooks


<details>
<summary style="font-size: 16px; font-weight: bold;">setApiKey(apiKey: string)</summary>

> Set your API key.
> 
> - Parameters
>   - **apiKey**(string): let the lib know your API key!
>
>
> - Example
>   ```js
>   webhooks.setApiKey('abafd0b47eda5ada0efeabcdec1fcc4da76b6ad1f3a85cac1fffffeb103fbe01');
>   ```
>   
</details>
<details>
<summary style="font-size: 16px; font-weight: bold;"><i>async</i> isListenerActive(userId: string) : Promise&lt;boolean></summary>

> You can create multiple listeners using the same token, since you can choose different events or endpoints per listener.
> This function helps you to determine if a listenerer with this userId (from the Crownstone Cloud) is already registered. This is scoped to your user.
> 
> If you create a listener more than once with the same configuration, your endpoint will be invoked more than once.
> 
> - Parameters
>   - **userId**(string): the userId belonging to the Crownstone Cloud user.
>
>
> - Returns
>   - **boolean**: Are there listener(s) registered?
>
>
> - Example
>   ```js
>   let isUserAlreadyRegistered = await webhooks.isListenerActiveByUserId('deda5fac1fffffeb103fbe01');
>   ```
>   
</details>
<details>
<summary style="font-size: 16px; font-weight: bold;"><i>async</i> getListeners() : Promise&lt;cloud_EventListener[]></summary>

> Get an array of all listeners you have registered hooks for. This is scoped to your user.
> 
> - Returns
>   - **cloud_EventListener[]**: Array of cloud_EventListener objects. [Type defintion is found here.](../src/declarations/cloudTypes.d.ts)
>
>
> - Example
>   ```js
>   let listeners = await webhooks.getListeners();
>   ```
>   
</details>
<details>
<summary style="font-size: 16px; font-weight: bold;"><i>async</i> createListener(userId: string, token: string, eventTypes: string[], url: string)</summary>

> Create an event listener for a Crownstone user. If an event belonging to the user is dispatched from the Cloud to the SSE server, it can be forwarded 
> to a provided url.
> 
> - Parameters
>  - **userId**(string): The Crownstone Cloud userId of the user that who owns the token.
>  - **token**(string): This is an access token or oauth token belonging to a Crownstone user.
>  - **eventTypes**(string[]): An array of eventtypes which will be forwarded to the url.
>       - "command"
>       - "presence"
>       - "dataChange"
>       - "abilityChange"
>       - "invitationChange"
>       - "switchStateUpdate"
>  - **url**(string): The URL which will be invoked when an event comes in.
>
>
> - Example
>   ```js
>   await webhooks.createListener(
>     'deda5fac1fffffeb103fbe01',
>     'abafd0b47eda5fac1fffffeb103fbe01',
>     ['command', 'presence'],
>     "https://integrations.myServer.com/crownstone"
>   );
>   ```
>
</details>
<details>
<summary style="font-size: 16px; font-weight: bold;"><i>async</i> removeListenerByUserId(userId: string)</summary>

> Remove all listeners that have been registered with this Crownstone Cloud userId (within the scope of your user).
>
> - Parameters
>   - **userId**(string): the userId belonging to the Crownstone Cloud user.
>
>
> - Example
>   ```js
>   await webhooks.removeListenerByUserId('deda5fac1fffffeb103fbe01');
>   ```
>
</details>

