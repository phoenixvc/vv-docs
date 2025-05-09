FROM node:18

# Install basic development tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    vim \
    graphviz \
    && rm -rf /var/lib/apt/lists/*

# Install global npm packages
RUN npm install -g yarn @docusaurus/core @docusaurus/cli

WORKDIR /workspace

# Set up non-root user for better security
ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Make sure the user exists
RUN if [ "$USERNAME" != "node" ]; then \
        groupadd --gid $USER_GID $USERNAME \
        && useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME; \
    fi

# Set ownership
RUN chown -R $USERNAME:$USERNAME /workspace
