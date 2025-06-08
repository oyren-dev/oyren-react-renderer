#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Oyren React Renderer - Demo Runner${NC}"
echo "================================================"

# Check if we're in the project root
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
    echo -e "${RED}❌ Error: Please run this script from the project root directory${NC}"
    echo "Expected: /path/to/oyren-react-renderer/"
    exit 1
fi

# Step 1: Install main dependencies
echo -e "\n${YELLOW}📦 Installing main package dependencies...${NC}"
if npm install; then
    echo -e "${GREEN}✅ Main dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install main dependencies${NC}"
    exit 1
fi

# Step 2: Build the package
echo -e "\n${YELLOW}🔨 Building the package...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Package built successfully${NC}"
else
    echo -e "${RED}❌ Failed to build package${NC}"
    exit 1
fi

# Step 3: Install demo dependencies
echo -e "\n${YELLOW}📦 Installing demo dependencies...${NC}"
cd examples/simple-demo
if npm install; then
    echo -e "${GREEN}✅ Demo dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install demo dependencies${NC}"
    exit 1
fi

# Step 4: Start the demo
echo -e "\n${GREEN}🎉 Starting the demo...${NC}"
echo -e "${BLUE}🌐 Demo will open at: http://localhost:3000${NC}"
echo -e "${YELLOW}💡 Press Ctrl+C to stop the demo${NC}"
echo "================================================"

npm run dev 