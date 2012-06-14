<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="text" indent="no"/>
<xsl:strip-space elements="*"/>
<xsl:template match="yandexsearch"><xsl:apply-templates select="//doc"/></xsl:template>
<xsl:template match="doc">
<xsl:value-of select="domain"/><xsl:text>	</xsl:text>
<xsl:value-of select="url"/><xsl:text>	</xsl:text>
<xsl:value-of select="passages"/><xsl:text>
</xsl:text>
</xsl:template>
</xsl:stylesheet>