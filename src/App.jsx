import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Chart from "react-apexcharts";
import globe from "./assets/glove.png";
import {
  UserOutlined,
  DashboardOutlined,
  FileTextOutlined,
  SettingOutlined,
  HomeOutlined,
  SolutionOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedBarangay, setSelectedBarangay] = useState("All");
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);
  const [showCharts, setShowCharts] = useState(false);
  const [chartData, setChartData] = useState({
    gender: { male: 0, female: 0 },
    provinces: {
      "Davao del Sur": 0,
      "Davao Occidental": 0,
      "Davao del Norte": 0,
      "Davao Oriental": 0,
    },
    ageRanges: {
      "17 and below": 0,
      "18 to 24": 0,
      "25 to 35": 0,
      "35 to 44": 0,
      "45 to 54": 0,
      "55 to 64": 0,
      "65 and above": 0,
    },
    occupations: {},
    simUsage: { 1: 0, 2: 0 },

    mobilePhoneUsage: {
      "Smart Phone ( Internet Capable but not 5G)": 0,
      "5G Ready Phone": 0,
      "Basic Phone (Keypad Only)": 0,
    },

    primarySimUsage: {
      "GLOBE Prepaid": 0,
      TM: 0,
      GOMO: 0,
      "SMART Prepaid": 0,
      TNT: 0,
      "DITO Prepaid": 0,
      Other: 0,
    },

    internetConnectionUsage: {
      NONE: 0,
      "Globe At Home Postpaid": 0,
      "GFiber Prepaid": 0,
      "Globe At Home Prepaid Wifi": 0,
      "Globe Pocket Wifi": 0,
      "Globe/TM Mobile Data": 0,
      "Gomo Mobile Data": 0,
      "PLDT Postpaid": 0,
      "PLDT Home Fiber Prepaid": 0,
      "PLDT Prepaid Home Wifi": 0,
      "Smart Pocket Wifi": 0,
      "Smart/TNT Mobile Data": 0,
      "Dito Home Wifi": 0,
      "Dito Mobile Data": 0,
      "Converge Postpaid": 0,
      "Converge Prepaid": 0,
      "Piso Net/ Vendo Wifi": 0,
      Other: 0,
    },

    facebookUsage: { Yes: 0, No: 0 },
    instagramUsage: { Yes: 0, No: 0 },
    twitterUsage: { Yes: 0, No: 0 },
    tiktokUsage: { Yes: 0, No: 0 },

    youtubeUsage: { Yes: 0, No: 0 },
    spotifyUsage: { Yes: 0, No: 0 },
    netflixUsage: { Yes: 0, No: 0 },
    musicUsage: { Yes: 0, No: 0 },
    viuUsage: { Yes: 0, No: 0 },
    hboUsage: { Yes: 0, No: 0 },
    videoUsage: { Yes: 0, No: 0 },
    disneyUsage: { Yes: 0, No: 0 },
    tfcUsage: { Yes: 0, No: 0 },
    vivaUsage: { Yes: 0, No: 0 },

    gcashUsage: { Yes: 0, No: 0 },
    mayaUsage: { Yes: 0, No: 0 },
    lazadaUsage: { Yes: 0, No: 0 },
    shopeeUsage: { Yes: 0, No: 0 },
    zaloraUsage: { Yes: 0, No: 0 },
    fbmarketUsage: { Yes: 0, No: 0 },
    foodpandaUsage: { Yes: 0, No: 0 },
    grabUsage: { Yes: 0, No: 0 },

    mlUsage: { Yes: 0, No: 0 },
    codUsage: { Yes: 0, No: 0 },
    genshinUsage: { Yes: 0, No: 0 },

    ecpayUsage: { Yes: 0, No: 0 },
    autotellerUsage: { Yes: 0, No: 0 },

    globeoneUsage: { Yes: 0, No: 0 },
    gomoUsage: { Yes: 0, No: 0 },
    gigalifeUsage: { Yes: 0, No: 0 },
    ditoUsage: { Yes: 0, No: 0 },
  });

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setIsUploaded(false);
      setSelectedCity("All");
      setSelectedBarangay("All");
    }
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        const uniqueCities = [
          ...new Set(jsonData.map((row) => row["City/Town"])),
        ];

        const uniqueBarangays = [
          ...new Set(
            jsonData.map(
              (row) =>
                row[
                  "Barangay (If executed in school or convergence area, indicate name of school or location)"
                ]
            )
          ),
        ];
        setCities(uniqueCities);

        setBarangays(uniqueBarangays);
        processChartData(jsonData);
        setIsUploaded(true);
        setShowCharts(true);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Please select a file first.");
    }
  };

  useEffect(() => {
    if (file && isUploaded) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        const filteredData =
          selectedCity === "All"
            ? jsonData
            : jsonData.filter((row) => row["City/Town"] === selectedCity);

        const filteredData2 =
          selectedBarangay === "All"
            ? jsonData
            : jsonData.filter(
                (row) =>
                  row[
                    "Barangay (If executed in school or convergence area, indicate name of school or location)"
                  ] === selectedBarangay
              );

        processChartData(filteredData);
        processChartData(filteredData2);
      };
      reader.readAsArrayBuffer(file);
    }
  }, [selectedCity, selectedBarangay, file, isUploaded]);

  const processChartData = (data) => {
    const maleCount = data.filter((row) => row.Sex === "Male").length;
    const femaleCount = data.filter((row) => row.Sex === "Female").length;

    const provinceCounts = {
      "Davao del Sur": 0,
      "Davao Occidental": 0,
      "Davao del Norte": 0,
      "Davao Oriental": 0,
    };

    const mobilePhoneUsageCounts = {
      "Smart Phone ( Internet Capable but not 5G)": 0,
      "5G Ready Phone": 0,
      "Basic Phone (Keypad Only)": 0,
    };

    const primarySimUsageCounts = {
      "GLOBE Prepaid": 0,
      TM: 0,
      GOMO: 0,
      "SMART Prepaid": 0,
      TNT: 0,
      "DITO Prepaid": 0,
      Other: 0,
    };

    const internetConnectionUsageCounts = {
      NONE: 0,
      "Globe At Home Postpaid": 0,
      "GFiber Prepaid": 0,
      "Globe At Home Prepaid Wifi": 0,
      "Globe Pocket Wifi": 0,
      "Globe/TM Mobile Data": 0,
      "Gomo Mobile Data": 0,
      "PLDT Postpaid": 0,
      "PLDT Home Fiber Prepaid": 0,
      "PLDT Prepaid Home Wifi": 0,
      "Smart Pocket Wifi": 0,
      "Smart/TNT Mobile Data": 0,
      "Dito Home Wifi": 0,
      "Dito Mobile Data": 0,
      "Converge Postpaid": 0,
      "Converge Prepaid": 0,
      "Piso Net/ Vendo Wifi": 0,
      Other: 0,
    };

    const barangayCounts = {};
    let totalBarangayCount = 0;

    const occupationCounts = {};
    const simUsageCounts = { 1: 0, 2: 0 };
    const facebookUsageCounts = { Yes: 0, No: 0 };
    const instagramUsageCounts = { Yes: 0, No: 0 };
    const twitterUsageCounts = { Yes: 0, No: 0 };
    const tiktokUsageCounts = { Yes: 0, No: 0 };

    const youtubeUsageCounts = { Yes: 0, No: 0 };
    const spotifyUsageCounts = { Yes: 0, No: 0 };
    const netflixUsageCounts = { Yes: 0, No: 0 };
    const musicUsageCounts = { Yes: 0, No: 0 };
    const viuUsageCounts = { Yes: 0, No: 0 };
    const hboUsageCounts = { Yes: 0, No: 0 };
    const videoUsageCounts = { Yes: 0, No: 0 };
    const disneyUsageCounts = { Yes: 0, No: 0 };
    const tfcUsageCounts = { Yes: 0, No: 0 };
    const vivaUsageCounts = { Yes: 0, No: 0 };

    const gcashUsageCounts = { Yes: 0, No: 0 };
    const mayaUsageCounts = { Yes: 0, No: 0 };
    const lazadaUsageCounts = { Yes: 0, No: 0 };
    const shopeeUsageCounts = { Yes: 0, No: 0 };
    const zaloraUsageCounts = { Yes: 0, No: 0 };
    const fbmarketUsageCounts = { Yes: 0, No: 0 };
    const foodpandaUsageCounts = { Yes: 0, No: 0 };
    const grabUsageCounts = { Yes: 0, No: 0 };

    const mlUsageCounts = { Yes: 0, No: 0 };
    const codUsageCounts = { Yes: 0, No: 0 };
    const genshinUsageCounts = { Yes: 0, No: 0 };

    const ecpayUsageCounts = { Yes: 0, No: 0 };
    const autotellerUsageCounts = { Yes: 0, No: 0 };

    const globeoneUsageCounts = { Yes: 0, No: 0 };
    const gomoUsageCounts = { Yes: 0, No: 0 };
    const gigalifeUsageCounts = { Yes: 0, No: 0 };
    const ditoUsageCounts = { Yes: 0, No: 0 };

    data.forEach((row) => {
      const barangay =
        row[
          "Barangay (If executed in school or convergence area, indicate name of school or location)"
        ];
      if (barangay) {
        barangayCounts[barangay] = (barangayCounts[barangay] || 0) + 1;
        totalBarangayCount++;
      }

      const province = row.Province;
      if (provinceCounts[province] !== undefined) {
        provinceCounts[province]++;
      }

      const occupation = row.Occupation;
      if (occupation) {
        occupationCounts[occupation] = (occupationCounts[occupation] || 0) + 1;
      }

      const mobilePhoneUsage = row["What type of mobile  phone do you use?"];
      if (mobilePhoneUsageCounts[mobilePhoneUsage] !== undefined) {
        mobilePhoneUsageCounts[mobilePhoneUsage]++;
      }

      const primarySimUsage =
        row[
          'What is your Primary SIM? (If Postpaid, pick "Other" and indicate network)'
        ];
      if (primarySimUsageCounts[primarySimUsage] !== undefined) {
        primarySimUsageCounts[primarySimUsage]++;
      }

      const internetConnectionUsage =
        row["What is your internet connection at home?"];
      if (
        internetConnectionUsageCounts[internetConnectionUsage] !== undefined
      ) {
        internetConnectionUsageCounts[internetConnectionUsage]++;
      }

      const simUsage =
        row["How many SIMs do you currently use on your mobile phone?"];
      if (simUsageCounts[simUsage] !== undefined) {
        simUsageCounts[simUsage]++;
      }

      const facebookUsage =
        row["Do you use the following Social Media Platforms? [Facebook]"];
      if (facebookUsageCounts[facebookUsage] !== undefined) {
        facebookUsageCounts[facebookUsage]++;
      }

      const instagramUsage =
        row["Do you use the following Social Media Platforms? [Instagram]"];
      if (instagramUsageCounts[instagramUsage] !== undefined) {
        instagramUsageCounts[instagramUsage]++;
      }

      const twitterUsage =
        row["Do you use the following Social Media Platforms? [X/ Twitter]"];
      if (twitterUsageCounts[twitterUsage] !== undefined) {
        twitterUsageCounts[twitterUsage]++;
      }

      const tiktokUsage =
        row["Do you use the following Social Media Platforms? [Tiktok]"];
      if (tiktokUsageCounts[tiktokUsage] !== undefined) {
        tiktokUsageCounts[tiktokUsage]++;
      }

      const youtubeUsage =
        row[
          "Do you use the following Video or Music Streaming Platforms? [Youtube]"
        ];
      if (youtubeUsageCounts[youtubeUsage] !== undefined) {
        youtubeUsageCounts[youtubeUsage]++;
      }

      const spotifyUsage =
        row[
          "Do you use the following Video or Music Streaming Platforms? [Spotify]"
        ];
      if (spotifyUsageCounts[spotifyUsage] !== undefined) {
        spotifyUsageCounts[spotifyUsage]++;
      }

      const netflixUsage =
        row[
          "Do you use the following Video or Music Streaming Platforms? [Netflix]"
        ];
      if (netflixUsageCounts[netflixUsage] !== undefined) {
        netflixUsageCounts[netflixUsage]++;
      }

      const musicUsage =
        row[
          "Do you use the following Video or Music Streaming Platforms? [Apple Music]"
        ];
      if (musicUsageCounts[musicUsage] !== undefined) {
        musicUsageCounts[musicUsage]++;
      }

      const viuUsage =
        row[
          "Do you use the following Video or Music Streaming Platforms? [Viu]"
        ];
      if (viuUsageCounts[viuUsage] !== undefined) {
        viuUsageCounts[viuUsage]++;
      }

      const hboUsage =
        row[
          "Do you use the following Video or Music Streaming Platforms? [HBO Go]"
        ];
      if (hboUsageCounts[hboUsage] !== undefined) {
        hboUsageCounts[hboUsage]++;
      }

      const videoUsage =
        row[
          "Do you use the following Video or Music Streaming Platforms? [Prime Video]"
        ];
      if (videoUsageCounts[videoUsage] !== undefined) {
        videoUsageCounts[videoUsage]++;
      }

      const disneyUsage =
        row[
          "Do you use the following Video or Music Streaming Platforms? [DIsney]"
        ];
      if (disneyUsageCounts[disneyUsage] !== undefined) {
        disneyUsageCounts[disneyUsage]++;
      }

      const tfcUsage =
        row[
          "Do you use the following Video or Music Streaming Platforms? [Iwant TFC]"
        ];
      if (tfcUsageCounts[tfcUsage] !== undefined) {
        tfcUsageCounts[tfcUsage]++;
      }

      const vivaUsage =
        row[
          "Do you use the following Video or Music Streaming Platforms? [VivaOne/Vivamax]"
        ];
      if (vivaUsageCounts[vivaUsage] !== undefined) {
        vivaUsageCounts[vivaUsage]++;
      }

      const gcashUsage =
        row["Do you use the following E-Wallet or Shopping Platforms? [GCash]"];
      if (gcashUsageCounts[gcashUsage] !== undefined) {
        gcashUsageCounts[gcashUsage]++;
      }

      const mayaUsage =
        row["Do you use the following E-Wallet or Shopping Platforms? [Maya]"];
      if (mayaUsageCounts[mayaUsage] !== undefined) {
        mayaUsageCounts[mayaUsage]++;
      }

      const lazadaUsage =
        row[
          "Do you use the following E-Wallet or Shopping Platforms? [Lazada]"
        ];
      if (lazadaUsageCounts[lazadaUsage] !== undefined) {
        lazadaUsageCounts[lazadaUsage]++;
      }

      const shopeeUsage =
        row[
          "Do you use the following E-Wallet or Shopping Platforms? [Shopee]"
        ];
      if (shopeeUsageCounts[shopeeUsage] !== undefined) {
        shopeeUsageCounts[shopeeUsage]++;
      }

      const zaloraUsage =
        row[
          "Do you use the following E-Wallet or Shopping Platforms? [Zalora]"
        ];
      if (zaloraUsageCounts[zaloraUsage] !== undefined) {
        zaloraUsageCounts[zaloraUsage]++;
      }

      const fbmarketUsage =
        row[
          "Do you use the following E-Wallet or Shopping Platforms? [Facebook Marketplace]"
        ];
      if (fbmarketUsageCounts[fbmarketUsage] !== undefined) {
        fbmarketUsageCounts[fbmarketUsage]++;
      }

      const foodpandaUsage =
        row[
          "Do you use the following E-Wallet or Shopping Platforms? [Foodpanda]"
        ];
      if (foodpandaUsageCounts[foodpandaUsage] !== undefined) {
        foodpandaUsageCounts[foodpandaUsage]++;
      }

      const grabUsage =
        row["Do you use the following E-Wallet or Shopping Platforms? [Grab]"];
      if (grabUsageCounts[grabUsage] !== undefined) {
        grabUsageCounts[grabUsage]++;
      }

      const mlUsage =
        row["Do you use the following Gaming Apps? [Mobile Legends]"];
      if (mlUsageCounts[mlUsage] !== undefined) {
        mlUsageCounts[mlUsage]++;
      }

      const codUsage =
        row["Do you use the following Gaming Apps? [Call of Duty]"];
      if (codUsageCounts[codUsage] !== undefined) {
        codUsageCounts[codUsage]++;
      }

      const genshinUsage =
        row["Do you use the following Gaming Apps? [Genshin Impact]"];
      if (genshinUsageCounts[genshinUsage] !== undefined) {
        genshinUsageCounts[genshinUsage]++;
      }

      const ecpayUsage =
        row["Do you use the following Self Service Machines? [ECPay/ Etap]"];
      if (ecpayUsageCounts[ecpayUsage] !== undefined) {
        ecpayUsageCounts[ecpayUsage]++;
      }

      const autotellerUsage =
        row[
          "Do you use the following Self Service Machines? [Automatic Teller Machine]"
        ];
      if (autotellerUsageCounts[autotellerUsage] !== undefined) {
        autotellerUsageCounts[autotellerUsage]++;
      }

      const globeoneUsage =
        row["Do you use the following Network Apps? [GlobeOne]"];
      if (globeoneUsageCounts[globeoneUsage] !== undefined) {
        globeoneUsageCounts[globeoneUsage]++;
      }

      const gomoUsage = row["Do you use the following Network Apps? [Gomo]"];
      if (gomoUsageCounts[gomoUsage] !== undefined) {
        gomoUsageCounts[gomoUsage]++;
      }

      const gigalifeUsage =
        row["Do you use the following Network Apps? [Gigalife]"];
      if (gigalifeUsageCounts[gigalifeUsage] !== undefined) {
        gigalifeUsageCounts[gigalifeUsage]++;
      }

      const ditoUsage = row["Do you use the following Network Apps? [Dito]"];
      if (ditoUsageCounts[ditoUsage] !== undefined) {
        ditoUsageCounts[ditoUsage]++;
      }
    });

    const socialMediaUsage = {
      Facebook: facebookUsageCounts.Yes,
      Instagram: instagramUsageCounts.Yes,
      Twitter: twitterUsageCounts.Yes,
      Tiktok: tiktokUsageCounts.Yes,
    };

    const videoStreamUsage = {
      Youtube: youtubeUsageCounts.Yes,
      Spotify: spotifyUsageCounts.Yes,
      Netflix: netflixUsageCounts.Yes,
      AppleMusic: musicUsageCounts.Yes,
      Viu: viuUsageCounts.Yes,
      HBOGo: hboUsageCounts.Yes,
      PrimeVideo: videoUsageCounts.Yes,
      Disney: disneyUsageCounts.Yes,
      TFC: tfcUsageCounts.Yes,
      VivaOne: vivaUsageCounts.Yes,
    };

    const ewalletUsage = {
      Gcash: gcashUsageCounts.Yes,
      Maya: mayaUsageCounts.Yes,
      Lazada: lazadaUsageCounts.Yes,
      Shopee: shopeeUsageCounts.Yes,
      Zalora: zaloraUsageCounts.Yes,
      FbMarket: fbmarketUsageCounts.Yes,
      Foodpanda: foodpandaUsageCounts.Yes,
      Grab: grabUsageCounts.Yes,
    };

    const gamingUsage = {
      MobileLegengs: mlUsageCounts.Yes,
      CallOfDuty: codUsageCounts.Yes,
      Genshin: genshinUsageCounts.Yes,
    };

    const servicemachineUsage = {
      ECPay: ecpayUsageCounts.Yes,
      ATM: autotellerUsageCounts.Yes,
    };

    const networkUsage = {
      GlobeOne: globeoneUsageCounts.Yes,
      Gomo: gomoUsageCounts.Yes,
      GigaLife: gigalifeUsageCounts.Yes,
      Dito: ditoUsageCounts.Yes,
    };
    const ageRanges = {
      "17 and below": 0,
      "18 to 24": 0,
      "25 to 35": 0,
      "35 to 44": 0,
      "45 to 54": 0,
      "55 to 64": 0,
      "65 and above": 0,
    };

    data.forEach((row) => {
      const ageRange = row["Age Range"];
      if (ageRanges[ageRange] !== undefined) {
        ageRanges[ageRange]++;
      }
    });

    setChartData({
      gender: { male: maleCount, female: femaleCount },
      provinces: provinceCounts,
      ageRanges: ageRanges,
      occupations: occupationCounts,
      simUsage: simUsageCounts,
      primarySimUsage: primarySimUsageCounts,
      mobilePhoneUsage: mobilePhoneUsageCounts,
      internetConnectionUsage: internetConnectionUsageCounts,

      facebookUsage: facebookUsageCounts,
      instagramUsage: instagramUsageCounts,

      socialMediaUsage: socialMediaUsage,
      videoStreamUsage: videoStreamUsage,

      ewalletUsage: ewalletUsage,
      gamingUsage: gamingUsage,
      servicemachineUsage: servicemachineUsage,
      networkUsage: networkUsage,

      barangay: barangayCounts,
      totalBarangayCount,
    });
  };

  const genderData = [
    { name: "Male", value: chartData.gender.male },
    { name: "Female", value: chartData.gender.female },
  ];

  const provinceData = Object.entries(chartData.provinces).map(
    ([name, value]) => ({ name, value })
  );

  const ageRangeData = Object.entries(chartData.ageRanges).map(
    ([name, value]) => ({ name, value })
  );

  const getHighestCategory = (data) => {
    return data.reduce(
      (prev, current) => (prev.value > current.value ? prev : current),
      data[0]
    );
  };

  const highestGender = getHighestCategory(genderData);
  const highestProvince = getHighestCategory(provinceData);
  const highestAgeRange = getHighestCategory(ageRangeData);

  const occupationData = Object.entries(chartData.occupations).map(
    ([name, value]) => ({ name, value })
  );
  const highestOccupation =
    occupationData.length > 0
      ? getHighestCategory(occupationData)
      : { name: "N/A", value: 0 };

  const simUsageData = Object.entries(chartData.simUsage).map(
    ([name, value]) => ({ name, value })
  );

  const mobilePhoneUsageData = Object.entries(chartData.mobilePhoneUsage).map(
    ([name, value]) => ({ name, value })
  );

  const primarySimUsageData = Object.entries(chartData.primarySimUsage).map(
    ([name, value]) => ({ name, value })
  );

  const internetConnectionUsageData = Object.entries(
    chartData.internetConnectionUsage
  ).map(([name, value]) => ({ name, value }));

  const highestmobilePhoneUsage =
    mobilePhoneUsageData.length > 0
      ? getHighestCategory(mobilePhoneUsageData)
      : { name: "N/A", value: 0 };

  const highestprimarySimUsage =
    primarySimUsageData.length > 0
      ? getHighestCategory(primarySimUsageData)
      : { name: "N/A", value: 0 };

  const highestSimUsage =
    simUsageData.length > 0
      ? getHighestCategory(simUsageData)
      : { name: "N/A", value: 0 };

  const highestinternetConnectionUsage =
    internetConnectionUsageData.length > 0
      ? getHighestCategory(internetConnectionUsageData)
      : { name: "N/A", value: 0 };

  const totalGenderCount = chartData.gender.male + chartData.gender.female;
  const totalProvincesCount = provinceData.length;
  const totalOccupationsCount = occupationData.length;

  return (
    <div className="flex min-h-screen ">
      <div className="w-1/6 h-screen flex flex-col bg-gradient-to-b from-white to-[#63a8e9] fixed top-0">
        <div className="flex items-center justify-center h-32 p-6">
          <img src={globe} alt="Logo" className="size-auto" />
        </div>
        <div className="flex flex-col items-center mb-4">
          <UserOutlined className="text-3xl text-gray-800 mb-2" />
          <p className="text-gray-800 font-semibold">Matthew Campbell</p>
          <p className="text-gray-600 text-xs">matthewcambell@globe.com</p>
        </div>
        <nav className="flex flex-col mt-10 space-y-4">
          <a
            href="#dashboard"
            className="flex items-center px-6 py-3 text-gray-800 hover:bg-[#5595d1] hover:text-white"
          >
            <DashboardOutlined className="mr-4" />
            <span>Dashboard</span>
          </a>
          <a
            href="#records"
            className="flex items-center px-6 py-3 text-gray-800 hover:bg-[#5595d1] hover:text-white"
          >
            <FileTextOutlined className="mr-4" />
            <span>Records</span>
          </a>
          <a
            href="#settings"
            className="flex items-center px-6 py-3 text-gray-800 hover:bg-[#5595d1] hover:text-white"
          >
            <SettingOutlined className="mr-4" />
            <span>Settings</span>
          </a>
        </nav>
      </div>

      <div className="w-full ml-[15%] p-20 bg-gray-200">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Welcome Back, Matthew!</h1>
          <div className="flex gap-4">
            <input
              type="file"
              accept=".xls, .xlsx"
              onChange={handleFileChange}
              className="border p-2 rounded"
            />
            <button
              onClick={handleUpload}
              className="ml-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-[#313da7]"
            >
              Upload
            </button>
          </div>
        </div>
        <div className="my-4">
          {isUploaded && file && ageRangeData.length > 0 ? (
            <>
              <label className="mr-2">Filter by City/Town:</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="All">All</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </>
          ) : null}

          {isUploaded && file && ageRangeData.length > 0 ? (
            <>
              <label className="mx-2">Barangay:</label>
              <select
                value={selectedBarangay}
                onChange={(e) => setSelectedBarangay(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="All">All</option>
                {barangays.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </>
          ) : null}
        </div>
        {isUploaded && file && ageRangeData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <UserOutlined className="text-3xl text-blue-500 mr-4" />
              <div>
                <h3 className="text-lg text-gray-800">Count of Users</h3>
                <p className="text-md text-gray-600">{totalGenderCount}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <HomeOutlined className="text-3xl text-green-500 mr-4" />
              <div>
                <h3 className="text-lg text-gray-800">Count of Provinces</h3>
                <p className="text-md text-gray-600">{totalProvincesCount}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <SolutionOutlined className="text-3xl text-yellow-500 mr-4" />
              <div>
                <h3 className="text-lg text-gray-800">Count of Occupations</h3>
                <p className="text-md text-gray-600">{totalOccupationsCount}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <EnvironmentOutlined className="text-3xl text-red-500 mr-4" />
              <div>
                <h3 className="text-lg text-gray-800">Count of Barangays</h3>
                <p className="text-md text-gray-600">
                  {chartData.totalBarangayCount}
                </p>
              </div>
            </div>
          </div>
        ) : null}
        <div
          className={`my-4 grid grid-cols-3 gap-8 chart-container ${
            showCharts ? "show" : ""
          }`}
        >
          {isUploaded && file && genderData.some((d) => d.value > 0) ? (
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">
                Gender Distribution
              </h2>
              <Chart
                options={{
                  labels: genderData.map((d) => d.name),
                  colors: [
                    "#4682B4", // Steel Blue
                    "#708090", // Slate Gray
                    "#D2B48C", // Tan
                    "#B0C4DE", // Light Steel Blue
                    "#FFD700", // Gold
                    "#A9A9A9", // Dark Gray
                    "#F08080", // Light Coral
                    "#FF6347", // Tomato
                    "#FFB6C1", // Light Pink
                    "#F4A460", // Sandy Brown
                    "#E9967A", // Dark Salmon
                    "#F0E68C", // Khaki
                    "#8B4513", // Saddle Brown
                    "#D3D3D3", // Light Gray
                    "#C0C0C0", // Silver
                  ],
                  plotOptions: { pie: { expandOnClick: true } },
                }}
                series={genderData.map((d) => d.value)}
                type="donut"
                height={300}
              />
              <p className="mt-4 text-gray-600">
                This chart shows that {highestGender.name} has the highest count
                with {highestGender.value} individuals.
              </p>
            </div>
          ) : null}
          {isUploaded && file && provinceData.length > 0 ? (
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">
                Province Distribution
              </h2>
              <Chart
                options={{
                  labels: provinceData.map((d) => d.name),
                  colors: [
                    "#4682B4", // Steel Blue
                    "#708090", // Slate Gray
                    "#D2B48C", // Tan
                    "#B0C4DE", // Light Steel Blue
                    "#FFD700", // Gold
                    "#A9A9A9", // Dark Gray
                    "#F08080", // Light Coral
                    "#FF6347", // Tomato
                    "#FFB6C1", // Light Pink
                    "#F4A460", // Sandy Brown
                    "#E9967A", // Dark Salmon
                    "#F0E68C", // Khaki
                    "#8B4513", // Saddle Brown
                    "#D3D3D3", // Light Gray
                    "#C0C0C0", // Silver
                  ],
                  plotOptions: { pie: { expandOnClick: true } },
                }}
                series={provinceData.map((d) => d.value)}
                type="donut"
                height={300}
              />
              <p className="mt-4 text-gray-600">
                This chart indicates that {highestProvince.name} has the highest
                count with {highestProvince.value} individuals.
              </p>
            </div>
          ) : null}
          {isUploaded && file && ageRangeData.length > 0 ? (
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">
                Age Range Distribution
              </h2>
              <Chart
                options={{
                  xaxis: {
                    categories: ageRangeData.map((d) => d.name),
                  },
                  colors: [
                    "#4682B4", // Steel Blue
                    "#708090", // Slate Gray
                    "#D2B48C", // Tan
                    "#B0C4DE", // Light Steel Blue
                    "#FFD700", // Gold
                    "#A9A9A9", // Dark Gray
                    "#F08080", // Light Coral
                    "#FF6347", // Tomato
                    "#FFB6C1", // Light Pink
                    "#F4A460", // Sandy Brown
                    "#E9967A", // Dark Salmon
                    "#F0E68C", // Khaki
                    "#8B4513", // Saddle Brown
                    "#D3D3D3", // Light Gray
                    "#C0C0C0", // Silver
                  ],
                  plotOptions: {
                    bar: { horizontal: false, endingShape: "flat" },
                  },
                }}
                series={[
                  {
                    name: "Count",
                    data: ageRangeData.map((d) => d.value),
                  },
                ]}
                type="bar"
                height={300}
              />
              <p className="mt-4 text-gray-600">
                The most prevalent age group is {highestAgeRange.name} with{" "}
                {highestAgeRange.value} individuals.
              </p>
            </div>
          ) : null}
        </div>
        <div
          className={`my-4 grid grid-cols-3 gap-8 chart-container ${
            showCharts ? "show" : ""
          }`}
        >
          {isUploaded && file ? (
            <div className="rounded-lg bg-white p-6 shadow col-span-2">
              <h2 className="text-xl font-semibold mb-4">Music Streaming</h2>
              <Chart
                options={{
                  chart: {
                    type: "line",
                    toolbar: { show: false },
                  },
                  xaxis: {
                    categories: Object.keys(chartData.videoStreamUsage),
                    title: {
                      text: "Platforms",
                    },
                  },
                  stroke: {
                    curve: "smooth",
                  },
                  colors: [
                    "#4682B4", // Steel Blue
                    "#708090", // Slate Gray
                    "#D2B48C", // Tan
                    "#B0C4DE", // Light Steel Blue
                    "#FFD700", // Gold
                    "#A9A9A9", // Dark Gray
                    "#F08080", // Light Coral
                    "#FF6347", // Tomato
                    "#FFB6C1", // Light Pink
                    "#F4A460", // Sandy Brown
                    "#E9967A", // Dark Salmon
                    "#F0E68C", // Khaki
                    "#8B4513", // Saddle Brown
                    "#D3D3D3", // Light Gray
                    "#C0C0C0", // Silver
                  ],
                  dataLabels: { enabled: true },
                  legend: { position: "bottom" },
                  title: {
                    text: "Music Streaming Usage",
                    align: "center",
                  },
                }}
                series={[
                  {
                    name: "Count",
                    data: Object.values(chartData.videoStreamUsage),
                  },
                ]}
                type="line"
                height={300}
              />
              {Object.values(chartData.videoStreamUsage).some(
                (value) => value > 0
              ) && (
                <p className="mt-4 text-gray-600">
                  This chart shows the number of respondents who use different
                  music/video streaming platforms.
                </p>
              )}
            </div>
          ) : null}
          {isUploaded && file ? (
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">Social Media</h2>
              <Chart
                options={{
                  labels: Object.keys(chartData.socialMediaUsage),
                  colors: [
                    "#4682B4", // Steel Blue
                    "#708090", // Slate Gray
                    "#D2B48C", // Tan
                    "#B0C4DE", // Light Steel Blue
                    "#FFD700", // Gold
                    "#A9A9A9", // Dark Gray
                    "#F08080", // Light Coral
                    "#FF6347", // Tomato
                    "#FFB6C1", // Light Pink
                    "#F4A460", // Sandy Brown
                    "#E9967A", // Dark Salmon
                    "#F0E68C", // Khaki
                    "#8B4513", // Saddle Brown
                    "#D3D3D3", // Light Gray
                    "#C0C0C0", // Silver
                  ],
                  plotOptions: {
                    pie: { expandOnClick: true },
                  },
                }}
                series={Object.values(chartData.socialMediaUsage)}
                type="donut"
                height={300}
              />
              <p className="mt-4 text-gray-600">
                This chart shows the number of respondents who use different
                social media platforms.
              </p>
            </div>
          ) : null}
        </div>
        <div
          className={`my-4 grid grid-cols-3 gap-8 chart-container ${
            showCharts ? "show" : ""
          }`}
        >
          {isUploaded && file ? (
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">Gaming Apps</h2>
              <Chart
                options={{
                  labels: Object.keys(chartData.gamingUsage),
                  colors: [
                    "#4682B4", // Steel Blue
                    "#708090", // Slate Gray
                    "#D2B48C", // Tan
                    "#B0C4DE", // Light Steel Blue
                    "#FFD700", // Gold
                    "#A9A9A9", // Dark Gray
                    "#F08080", // Light Coral
                    "#FF6347", // Tomato
                    "#FFB6C1", // Light Pink
                    "#F4A460", // Sandy Brown
                    "#E9967A", // Dark Salmon
                    "#F0E68C", // Khaki
                    "#8B4513", // Saddle Brown
                    "#D3D3D3", // Light Gray
                    "#C0C0C0", // Silver
                  ],
                  plotOptions: {
                    pie: { expandOnClick: true },
                  },
                }}
                series={Object.values(chartData.gamingUsage)}
                type="donut"
                height={300}
              />
              <p className="mt-4 text-gray-600">
                This chart shows the number of respondents who use different
                gaming app platforms.
              </p>
            </div>
          ) : null}
          {isUploaded && file ? (
            <div className="rounded-lg bg-white p-6 shadow col-span-2">
              <h2 className="text-xl font-semibold mb-4">
                E-Wallet or Shopping Platforms
              </h2>
              <Chart
                options={{
                  chart: {
                    type: "line",
                    toolbar: { show: false },
                  },
                  xaxis: {
                    categories: Object.keys(chartData.ewalletUsage),
                    title: {
                      text: "Platforms",
                    },
                  },
                  stroke: {
                    curve: "smooth",
                  },
                  colors: [
                    "#4682B4", // Steel Blue
                    "#708090", // Slate Gray
                    "#D2B48C", // Tan
                    "#B0C4DE", // Light Steel Blue
                    "#FFD700", // Gold
                    "#A9A9A9", // Dark Gray
                    "#F08080", // Light Coral
                    "#FF6347", // Tomato
                    "#FFB6C1", // Light Pink
                    "#F4A460", // Sandy Brown
                    "#E9967A", // Dark Salmon
                    "#F0E68C", // Khaki
                    "#8B4513", // Saddle Brown
                    "#D3D3D3", // Light Gray
                    "#C0C0C0", // Silver
                  ],
                  dataLabels: { enabled: true },
                  legend: { position: "bottom" },
                  title: {
                    text: "Music Streaming Usage",
                    align: "center",
                  },
                }}
                series={[
                  {
                    name: "Count",
                    data: Object.values(chartData.ewalletUsage),
                  },
                ]}
                type="line"
                height={300}
              />
              {Object.values(chartData.ewalletUsage).some(
                (value) => value > 0
              ) && (
                <p className="mt-4 text-gray-600">
                  This chart shows the number of respondents who use different
                  e-wallet or shopping platforms.
                </p>
              )}
            </div>
          ) : null}

          {isUploaded && file ? (
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">
                Self Service Machine
              </h2>
              <Chart
                options={{
                  labels: Object.keys(chartData.servicemachineUsage),
                  colors: [
                    "#4682B4", // Steel Blue
                    "#708090", // Slate Gray
                    "#D2B48C", // Tan
                    "#B0C4DE", // Light Steel Blue
                    "#FFD700", // Gold
                    "#A9A9A9", // Dark Gray
                    "#F08080", // Light Coral
                    "#FF6347", // Tomato
                    "#FFB6C1", // Light Pink
                    "#F4A460", // Sandy Brown
                    "#E9967A", // Dark Salmon
                    "#F0E68C", // Khaki
                    "#8B4513", // Saddle Brown
                    "#D3D3D3", // Light Gray
                    "#C0C0C0", // Silver
                  ],
                  plotOptions: {
                    pie: { expandOnClick: true },
                  },
                }}
                series={Object.values(chartData.servicemachineUsage)}
                type="donut"
                height={300}
              />
              <p className="mt-4 text-gray-600">
                This chart shows the number of respondents who use different
                self service maching platforms.
              </p>
            </div>
          ) : null}

          {isUploaded && file ? (
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">Network Apps</h2>
              <Chart
                options={{
                  labels: Object.keys(chartData.networkUsage),
                  colors: [
                    "#4682B4", // Steel Blue
                    "#708090", // Slate Gray
                    "#D2B48C", // Tan
                    "#B0C4DE", // Light Steel Blue
                    "#FFD700", // Gold
                    "#A9A9A9", // Dark Gray
                    "#F08080", // Light Coral
                    "#FF6347", // Tomato
                    "#FFB6C1", // Light Pink
                    "#F4A460", // Sandy Brown
                    "#E9967A", // Dark Salmon
                    "#F0E68C", // Khaki
                    "#8B4513", // Saddle Brown
                    "#D3D3D3", // Light Gray
                    "#C0C0C0", // Silver
                  ],
                  plotOptions: {
                    pie: { expandOnClick: true },
                  },
                }}
                series={Object.values(chartData.networkUsage)}
                type="donut"
                height={300}
              />
              <p className="mt-4 text-gray-600">
                This chart shows the number of respondents who use different
                network app platforms.
              </p>
            </div>
          ) : null}

          {isUploaded && file ? (
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">SIM Usage</h2>
              <Chart
                options={{
                  labels: Object.keys(chartData.simUsage),
                  colors: [
                    "#4682B4", // Steel Blue
                    "#708090", // Slate Gray
                    "#D2B48C", // Tan
                    "#B0C4DE", // Light Steel Blue
                    "#FFD700", // Gold
                    "#A9A9A9", // Dark Gray
                    "#F08080", // Light Coral
                    "#FF6347", // Tomato
                    "#FFB6C1", // Light Pink
                    "#F4A460", // Sandy Brown
                    "#E9967A", // Dark Salmon
                    "#F0E68C", // Khaki
                    "#8B4513", // Saddle Brown
                    "#D3D3D3", // Light Gray
                    "#C0C0C0", // Silver
                  ],
                  plotOptions: {
                    pie: { expandOnClick: true },
                  },
                }}
                series={Object.values(chartData.simUsage)}
                type="donut"
                height={300}
              />
              {highestSimUsage.value > 0 && (
                <p className="mt-4 text-gray-600">
                  The predominant SIM usage is {highestSimUsage.name}, with a
                  total of {highestSimUsage.value} respondents indicating this
                  usage.
                </p>
              )}
            </div>
          ) : null}

          {isUploaded && file && Object.keys(chartData.barangay).length > 0 ? (
            <div className="col-span-3 rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">Barangay</h2>
              <Chart
                options={{
                  chart: { type: "bar", toolbar: { show: false } },
                  xaxis: { categories: Object.keys(chartData.barangay) },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      endingShape: "rounded",
                      columnWidth: "45%",
                    },
                  },
                  colors: [
                    "#4682B4", // Steel Blue
                    "#708090", // Slate Gray
                    "#D2B48C", // Tan
                    "#B0C4DE", // Light Steel Blue
                    "#FFD700", // Gold
                    "#A9A9A9", // Dark Gray
                    "#F08080", // Light Coral
                    "#FF6347", // Tomato
                    "#FFB6C1", // Light Pink
                    "#F4A460", // Sandy Brown
                    "#E9967A", // Dark Salmon
                    "#F0E68C", // Khaki
                    "#8B4513", // Saddle Brown
                    "#D3D3D3", // Light Gray
                    "#C0C0C0", // Silver
                  ],
                  dataLabels: { enabled: true },
                  legend: { position: "bottom" },
                }}
                series={[
                  {
                    name: "Count",
                    data: Object.values(chartData.barangay),
                  },
                ]}
                type="bar"
                height={300}
              />
              <p>
                This chart shows the number of respondents from each barangay,
                highlighting the distribution of participants across different
                areas.
              </p>
            </div>
          ) : null}
          {isUploaded &&
          file &&
          Object.keys(chartData.occupations).length > 0 ? (
            <div className="col-span-3 rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">
                Occupation Distribution
              </h2>
              <Chart
                options={{
                  chart: { type: "bar", toolbar: { show: false } },
                  xaxis: { categories: Object.keys(chartData.occupations) },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      endingShape: "rounded",
                      columnWidth: "45%",
                    },
                  },
                  colors: [
                    "#4682B4", // Steel Blue
                    "#708090", // Slate Gray
                    "#D2B48C", // Tan
                    "#B0C4DE", // Light Steel Blue
                    "#FFD700", // Gold
                    "#A9A9A9", // Dark Gray
                    "#F08080", // Light Coral
                    "#FF6347", // Tomato
                    "#FFB6C1", // Light Pink
                    "#F4A460", // Sandy Brown
                    "#E9967A", // Dark Salmon
                    "#F0E68C", // Khaki
                    "#8B4513", // Saddle Brown
                    "#D3D3D3", // Light Gray
                    "#C0C0C0", // Silver
                  ],
                  dataLabels: { enabled: true },
                  legend: { position: "bottom" },
                }}
                series={[
                  {
                    name: "Count",
                    data: Object.values(chartData.occupations),
                  },
                ]}
                type="bar"
                height={300}
              />
              {highestOccupation.value > 0 && (
                <p className="mt-4 text-gray-600">
                  The most common occupation is {highestOccupation.name} with a
                  total of {highestOccupation.value} as the highest value.{" "}
                </p>
              )}
            </div>
          ) : null}
        </div>

        <div
          className={`my-4 grid grid-cols-4 gap-8 chart-container ${
            showCharts ? "show" : ""
          }`}
        >
          {isUploaded && file ? (
            <div className="col-span-2 rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">Mobile Phone Usage</h2>
              <Chart
                options={{
                  labels: Object.keys(chartData.mobilePhoneUsage),
                  colors: [
                    "#4682B4", // Steel Blue
                    "#708090", // Slate Gray
                    "#D2B48C", // Tan
                    "#B0C4DE", // Light Steel Blue
                    "#FFD700", // Gold
                    "#A9A9A9", // Dark Gray
                    "#F08080", // Light Coral
                    "#FF6347", // Tomato
                    "#FFB6C1", // Light Pink
                    "#F4A460", // Sandy Brown
                    "#E9967A", // Dark Salmon
                    "#F0E68C", // Khaki
                    "#8B4513", // Saddle Brown
                    "#D3D3D3", // Light Gray
                    "#C0C0C0", // Silver
                  ],
                  plotOptions: {
                    pie: { expandOnClick: true },
                  },
                }}
                series={Object.values(chartData.mobilePhoneUsage)}
                type="donut"
                height={300}
              />
              {highestmobilePhoneUsage.value > 0 && (
                <p className="mt-4 text-gray-600">
                  The highest Mobile Phone usage is{" "}
                  {highestmobilePhoneUsage.name}, with a total of{" "}
                  {highestmobilePhoneUsage.value} respondents indicating this
                  usage.
                </p>
              )}
            </div>
          ) : null}

          {isUploaded && file ? (
            <div className="col-span-2 rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">Primary Sim Usage</h2>
              <Chart
                options={{
                  labels: Object.keys(chartData.primarySimUsage),
                  colors: [
                    "#4682B4", // Steel Blue
                    "#708090", // Slate Gray
                    "#D2B48C", // Tan
                    "#B0C4DE", // Light Steel Blue
                    "#FFD700", // Gold
                    "#A9A9A9", // Dark Gray
                    "#F08080", // Light Coral
                    "#FF6347", // Tomato
                    "#FFB6C1", // Light Pink
                    "#F4A460", // Sandy Brown
                    "#E9967A", // Dark Salmon
                    "#F0E68C", // Khaki
                    "#8B4513", // Saddle Brown
                    "#D3D3D3", // Light Gray
                    "#C0C0C0", // Silver
                  ],
                  plotOptions: {
                    pie: { expandOnClick: true },
                  },
                }}
                series={Object.values(chartData.primarySimUsage)}
                type="donut"
                height={300}
              />
              {highestprimarySimUsage.value > 0 && (
                <p className="mt-4 text-gray-600">
                  The highest Primary Sim usage is {highestprimarySimUsage.name}
                  , with a total of {highestprimarySimUsage.value} respondents
                  indicating this usage.
                </p>
              )}
            </div>
          ) : null}
          {isUploaded && file ? (
            <div className="col-span-2 rounded-lg bg-white p-6 shadow">
              <h2 className="text-xl font-semibold mb-4">
                Internet Connection Usage
              </h2>
              <Chart
                options={{
                  labels: Object.keys(chartData.internetConnectionUsage),
                  colors: [
                    "#4682B4", // Steel Blue
                    "#708090", // Slate Gray
                    "#D2B48C", // Tan
                    "#B0C4DE", // Light Steel Blue
                    "#FFD700", // Gold
                    "#A9A9A9", // Dark Gray
                    "#F08080", // Light Coral
                    "#FF6347", // Tomato
                    "#FFB6C1", // Light Pink
                    "#F4A460", // Sandy Brown
                    "#E9967A", // Dark Salmon
                    "#F0E68C", // Khaki
                    "#8B4513", // Saddle Brown
                    "#D3D3D3", // Light Gray
                    "#C0C0C0", // Silver
                  ],
                  plotOptions: {
                    pie: { expandOnClick: true },
                  },
                }}
                series={Object.values(chartData.internetConnectionUsage)}
                type="donut"
                height={300}
              />
              {highestinternetConnectionUsage.value > 0 && (
                <p className="mt-4 text-gray-600">
                  The highest Internet Connection usage is{" "}
                  {highestinternetConnectionUsage.name}, with a total of{" "}
                  {highestinternetConnectionUsage.value} respondents indicating
                  this usage.
                </p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;