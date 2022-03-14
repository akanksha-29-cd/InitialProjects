FROM dtr.central.docker4sg.saint-gobain.net/ids-tools/vault-azure-cli:1.0

ARG RID=""
ENV RID $RID
ARG SID=""
ENV SID $SID
ARG TARGET=""
ENV TARGET $TARGET
ARG ACCOUNT_NAME=""
ENV ACCOUNT_NAME $ACCOUNT_NAME


ENV http_proxy="http://proxyout.cly.dtc3.cf.saint-gobain.net:3128"
ENV https_proxy="http://proxyout.cly.dtc3.cf.saint-gobain.net:3128"
ENV no_proxy=nexus.ids.saint-gobain.com,vault.ids.saint-gobain.com,uat.websso.saint-gobain.com


# Inject configuration template
COPY ".env.ctmpl" "/consul-template/template/.env.ctmpl"
RUN echo $RID >> /vault-agent/config/roleid
RUN echo $SID >> /vault-agent/config/secretid
RUN unset RID && unset SID


# make the 'app' folder the current working directory
WORKDIR /app


# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY dist .


# get env variables before build
RUN /usr/bin/vault-agent/vault agent -config /vault-agent/config/agent-config.hcl -log-level debug
RUN /usr/bin/consul-template/consul-template -once -log-level debug -config /consul-template/config/consul-config.hcl -template /consul-template/template/.env.ctmpl:/app/.env.local

RUN export AZ_APP_ID=$(cat /app/.env.local | grep AZ_APP_ID | cut -d \= -f 2) \
    && export AZ_SERVICE_PRINCIPAL_PASSWORD=$(cat /app/.env.local | grep AZ_SERVICE_PRINCIPAL_PASSWORD | cut -d \= -f 2) \
    &&  export AZ_SERVICE_PRINCIPAL_TENANT=$(cat /app/.env.local | grep AZ_SERVICE_PRINCIPAL_TENANT | cut -d \= -f 2) \
    && az login --service-principal -u $AZ_APP_ID -p $AZ_SERVICE_PRINCIPAL_PASSWORD --tenant $AZ_SERVICE_PRINCIPAL_TENANT \
    && az storage blob upload-batch -s /app/capacity-planning -d '$web' --account-name $ACCOUNT_NAME
