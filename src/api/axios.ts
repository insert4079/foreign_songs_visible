import axios from 'axios';

export const apiMusixmatch = axios.create({
    baseURL: 'https://api.musixmatch.com/ws/1.1/',
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
});

export const apiTranslator = axios.create({
    baseURL: 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=ru',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Ocp-Apim-Subscription-Key': '85b64a64bfe24e3b811812ad91076f2d',
        'Ocp-Apim-Subscription-Region': 'Serbia',
        'X-ClientTraceId': '998373f8-2c78-11ee-be56-0242ac120002',
        'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleTEiLCJ0eXAiOiJKV1QifQ.eyJyZWdpb24iOiJ3ZXN0ZXVyb3BlIiwic3Vic2NyaXB0aW9uLWlkIjoiMzY4ZjlkOTc1MTAwNDIwMzk5Y2U2MTU1ZWZkYTZhMGEiLCJwcm9kdWN0LWlkIjoiVGV4dFRyYW5zbGF0b3IuRjAiLCJjb2duaXRpdmUtc2VydmljZXMtZW5kcG9pbnQiOiJodHRwczovL2FwaS5jb2duaXRpdmUubWljcm9zb2Z0LmNvbS9pbnRlcm5hbC92MS4wLyIsImF6dXJlLXJlc291cmNlLWlkIjoiL3N1YnNjcmlwdGlvbnMvM2VmM2NhYjQtODkyNS00MjhiLTljZTItMTgyMzY2Yzc4ZTFhL3Jlc291cmNlR3JvdXBzL0dyb3VwMS9wcm92aWRlcnMvTWljcm9zb2Z0LkNvZ25pdGl2ZVNlcnZpY2VzL2FjY291bnRzL2luc2VydDQwNzkiLCJzY29wZSI6Imh0dHBzOi8vYXBpLm1pY3Jvc29mdHRyYW5zbGF0b3IuY29tLyIsImF1ZCI6InVybjptcy5taWNyb3NvZnR0cmFuc2xhdG9yIiwiZXhwIjoxNjkxNjc1NzQ3LCJpc3MiOiJ1cm46bXMuY29nbml0aXZlc2VydmljZXMifQ.Z77UTifQrBpV_ND7TCQqaYfvnLEoyfRDwmxacY8IWR8-Ac1Q5o29WwZL62_4O4GpUGfWzdIXgpUeCVbLb1ZLlg'
    },
});

export const apiRefreshTranslatorToken = axios.create({
    baseURL: 'https://westeurope.api.cognitive.microsoft.com/sts/v1.0/issueToken',
    params: {
        'Subscription-Key': '85b64a64bfe24e3b811812ad91076f2d'
    }
})