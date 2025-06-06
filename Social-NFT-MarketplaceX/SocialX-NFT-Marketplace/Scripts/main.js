       var finished=0;
       var check=0;
        Moralis.initialize("xeYLWci5Sv8KBG5Ipp2Z36A1QLHq6uw80Zl7juog"); // Application id from moralis.io
		Moralis.serverURL = "https://5zm13lhfi3sm.usemoralis.com:2053/server"; //Server url from moralis.io
        var objectId="";
		var Owner;
        let id=10000000000;
        let id2=0;
        let _id;

        function openNav() {
            document.getElementById("mySidenav").style.width = "250px";
        }

        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
        }

        async function onload(){
            console.log("page is loaded");
            const Monster = Moralis.Object.extend("Artwork_NFTs");
            const query = new Moralis.Query(Monster);
            const results = await query.find();
            // Do something with the returned Moralis.Object values
            for (let i = 0; i < results.length; i++) {
            const object = results[i];
            const Name=object.get("Name");
            const Price=object.get("Price");
            const Description=object.get("Description");
            const Metadata=object.get("Metadata");
            var newElement=document.createElement("div"); 
            newElement.setAttribute("style","width:23%;height:80vh;background-color:white;display:inline-block;margin-left:20px;margin-top:20px;border-radius:15px;text-align:center;");
            document.body.appendChild(newElement);
            var image=document.createElement("img");
            var header=document.createElement("h2");
            var div=document.createElement("div");
            var _name=document.createElement("h3");
            var _price=document.createElement("h3");
            var _description=document.createElement("h3");
            var button=document.createElement("h3");
            image.setAttribute("style","width:250px;height:250px;margin-top:15%;border-radius:8px;");
            image.setAttribute("src",Metadata.url());
            _name.setAttribute("style","color:black;display:inline-block;font-family: 'Oswald', sans-serif;");
            _price.setAttribute("style","color:black;display:inline-block;margin-left:10%;font-family: 'Oswald', sans-serif;");
            button.setAttribute("class","button glow-button");
            button.setAttribute("style","width:30%;height:25px;display:block;margin-left:23%;");
            button.setAttribute("title","Artwork");
            button.setAttribute("id",object.id);
            button.setAttribute("onclick","buy(this)");
            header.innerHTML=Name;
           _name.innerHTML=Name;
           _price.innerHTML=Price+" ETH";
            button.innerHTML="Buy";
            newElement.appendChild(image);
            newElement.appendChild(_name);
            newElement.appendChild(_price);
            newElement.appendChild(button);
            console.log(check);
            console.log(results.length-1);
            if(i==results.length-1){
                setTimeout(loadSocial,1000);
            }           
        }
    }

        async function buy(btn){
            objectId=btn.id;
            sessionStorage.setItem("objectID",objectId);
            sessionStorage.setItem("Type",btn.title);
            console.log(objectId);
            location.replace("NFT.html")
        }

        async function loadSocial(){
            console.log("page is loaded");
            const Monster = Moralis.Object.extend("SocialContent_NFTs");
            const query = new Moralis.Query(Monster);
            const results = await query.find();
            // Do something with the returned Moralis.Object values
            for (let i = 0; i < results.length; i++) {
            if(i==0){
                console.log("i=0");
                var h2=document.createElement("h2");
                var body=document.getElementById("body");
                h2.setAttribute("style","margin-top:3%;margin-left:3%;");
                h2.innerHTML="Social Contents";
                body.appendChild(h2);
            }
            const object = results[i];
            const Name=object.get("Name");
            const Price=object.get("Price");
            const Description=object.get("Description");
            const Metadata=object.get("Link");
            console.log(Metadata);
            var newElement=document.createElement("div"); 
            newElement.setAttribute("style","width:48%;height:80vh;background-color:white;display:inline-block;margin-left:20px;margin-top:20px;border-radius:15px;text-align:center;");
            document.body.appendChild(newElement);
            var iframe=document.createElement("iframe");
            var header=document.createElement("h2");
            var div=document.createElement("div");
            var _name=document.createElement("h3");
            var _price=document.createElement("h3");
            var _description=document.createElement("h3");
            var button=document.createElement("h3");
            iframe.setAttribute("style","width:90%;height:55%;margin-top:5%;border-radius:8px;");
            iframe.setAttribute("src","https://www.youtube.com/embed/"+Metadata);
            _name.setAttribute("style","color:black;display:inline-block;font-family: 'Oswald', sans-serif;");
            _price.setAttribute("style","color:black;display:inline-block;margin-left:10%;font-family: 'Oswald', sans-serif;");
            button.setAttribute("class","button glow-button");
            button.setAttribute("style","width:30%;height:25px;display:block;margin-left:30%;margin-top:5%");
            button.setAttribute("id",object.id);
            button.setAttribute("title","Social Content");
            button.setAttribute("onclick","buy(this)");
            header.innerHTML=Name;
           _name.innerHTML=Name;
           _price.innerHTML=Price+" ETH";
            button.innerHTML="Buy";
            newElement.appendChild(iframe);
            newElement.appendChild(_name);
            newElement.appendChild(_price);
            newElement.appendChild(button);
        }
    }

		function getNFTType(){
			NFType=document.getElementById("selector").value;
			console.log(NFType);
			if(NFType=="Social Content"){
				console.log("aaaaa");
				location.replace("mintsocialcontent.html");
			}
		}
	
		async function login(){
            console.log(nftCount1);
			console.log("login clicked");
			var user = await Moralis.Web3.authenticate();
            accounts=await window.ethereum.request({method:"eth_requestAccounts"}).catch((err)=>{
            console.log(err.code);
            })
			if(user){
				console.log(user);
				user.set("nickname","VITALIK");
				user.set("fav_color","blue");
				user.save();
			}
            console.log(accounts);
		}

        mintNFTs=async()=>{
            accounts=await window.ethereum.request({method:"eth_requestAccounts"}).catch((err)=>{
            console.log(err.code);
            })
            const NFT = Moralis.Object.extend("Artwork_NFTs");
            const NFT1 = new NFT();
            NFT1.set("Name",document.getElementById("Name").value);
            NFT1.set("Price",document.getElementById("Price").value);
            NFT1.set("Description",document.getElementById("Description").value);
            NFT1.set("Creator",accounts);
            NFT1.set("Owner",accounts);
            NFT1.set("IDs",id+_id);
            const fileUploadControl = document.getElementById("İmageSelector");
               if (fileUploadControl.files.length > 0) {
               const file = fileUploadControl.files[0];
               const name = "photo.jpg";
               const moralisFile = new Moralis.File(name, file);
               NFT1.set("Metadata",moralisFile);
            }
            acc=accounts[0];
            console.log(acc);
            await NFT1.save();

            return contract.methods.mint(acc,id+_id,1).send({from:acc})
        }

        async function getNFT(){
			web3=new Web3(window.ethereum);
            var address="0xF03C5D1943eBdcA9e0881b18d9F98a17a8E62794";
            var abi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "values",
				"type": "uint256[]"
			}
		],
		"name": "TransferBatch",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "TransferSingle",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "value",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "URI",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "TWEET1",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TWEET2",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "accounts",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			}
		],
		"name": "balanceOfBatch",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNftCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "adres",
				"type": "address"
			}
		],
		"name": "givePermission",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "adres",
				"type": "address"
			}
		],
		"name": "rejectAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amounts",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeBatchTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "numberOfDays",
				"type": "uint256"
			}
		],
		"name": "setDuration",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "uri",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
	
  
            contract=new web3.eth.Contract(abi,address);
            contract.methods.getId().call().then(function(id){
                _id=id;
                console.log(_id);
            });
            var objectID=sessionStorage.getItem("objectID");
            var Type=sessionStorage.getItem("Type");
            console.log(objectID);
            Moralis.initialize("xeYLWci5Sv8KBG5Ipp2Z36A1QLHq6uw80Zl7juog"); // Application id from moralis.io
		    Moralis.serverURL = "https://5zm13lhfi3sm.usemoralis.com:2053/server"; //Server url from moralis.io
             
            if(Type=="Artwork"){
                document.getElementById("img").setAttribute("style","width:95%;height:70vh;border-radius: 3%;margin-left: 3%;margin-top: 5%;");
                const NFT = Moralis.Object.extend("Artwork_NFTs");
                const query = new Moralis.Query(NFT);
                query.get(objectID)
           .then((NFT) => {
            const Name = NFT.get("Name");
            const Price=NFT.get("Price");
            const Description=NFT.get("Description");
            const Metadata=NFT.get("Metadata");
            Owner=NFT.get("Owner");
            id=NFT.get("IDs");
            console.log(Price);
            console.log(Metadata.url());
            console.log(Description);
            console.log(Name);
            console.log(id);
            console.log(Owner);
            document.getElementById("name").innerHTML=Name;
            document.getElementById("img").setAttribute("src",Metadata.url());
            document.getElementById("Price").innerHTML=Price+" ETH";
            document.getElementById("Desc").innerHTML=Description;
            document.getElementById("Owner").innerHTML="Owned by "+Owner;
           }, (error) => {
           });
            }
            if(Type=="Social Content"){
                document.getElementById("iframe").setAttribute("style","width:97%;height:85%;margin-top:8%;border-radius:8px;")
                const NFT = Moralis.Object.extend("SocialContent_NFTs");
                const query = new Moralis.Query(NFT);
                query.get(objectID)
           .then((NFT) => {
            const Name = NFT.get("Name");
            const Price=NFT.get("Price");
            const Description=NFT.get("Description");
            const Metadata=NFT.get("Link");
            const Owner=NFT.get("Owner");
            id=NFT.get("IDs");
            console.log(Price);
            console.log(Description);
            console.log(Name);
            console.log(id);
            document.getElementById("name").innerHTML=Name;
            document.getElementById("iframe").setAttribute("src","https://www.youtube.com/embed/"+Metadata);
            document.getElementById("Price").innerHTML=Price+" ETH";
            document.getElementById("Desc").innerHTML=Description;
            document.getElementById("Owner").innerHTML="Owned by "+Owner;
           }, (error) => {
           });
            }
            //get monster with id xWMyZ4YEGZ

        }

        async function buyNFT(){
            accounts=await window.ethereum.request({method:"eth_requestAccounts"}).catch((err)=>{
            console.log(err.code);
            })
			var objectID=sessionStorage.getItem("objectID");
            var Type=sessionStorage.getItem("Type");
            console.log(objectID);
            Moralis.initialize("xeYLWci5Sv8KBG5Ipp2Z36A1QLHq6uw80Zl7juog"); // Application id from moralis.io
		    Moralis.serverURL = "https://5zm13lhfi3sm.usemoralis.com:2053/server"; //Server url from moralis.io
			if(Type=="Artwork"){
				const NFT = Moralis.Object.extend("Artwork_NFTs");
                const query = new Moralis.Query(NFT);
                query.get(objectID)
                .then((NFT) => {
                const Name = NFT.get("Name");
                const Price=NFT.get("Price");
                const Description=NFT.get("Description");
                const Metadata=NFT.get("Metadata");
                Owner=NFT.get("Owner");
				Owner=Owner.toString();
                id=NFT.get("IDs");
				console.log(Owner);
				console.log(accounts[0]);
				console.log(id);
				NFT.set("Owner",accounts[0].split(" "));
				return [contract.methods.transfer(Owner,accounts[0],id,1).send({from:accounts[0]}),NFT.save()]
           }, (error) => {
           });

			}
			if(Type=="Social Content"){
				const NFT = Moralis.Object.extend("SocialContent_NFTs");
                const query = new Moralis.Query(NFT);
                query.get(objectID)
                .then((NFT) => {
                const Name = NFT.get("Name");
                const Price=NFT.get("Price");
                const Description=NFT.get("Description");
                const Metadata=NFT.get("Metadata");
                Owner=NFT.get("Owner");
				Owner=Owner.toString();
                id=NFT.get("IDs");
				console.log(Owner);
				console.log(accounts[0]);
				console.log(id);
				NFT.set("Owner",accounts[0].split(" "));
				return [contract.methods.transfer(Owner,accounts[0],id,1).send({from:accounts[0]}),NFT.save()]
           }, (error) => {
           });

			}
        }


