<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:kp="urn://x-artefacts-rosreestr-ru/outgoing/kpzu/6.0.1" xmlns:cert="urn://x-artefacts-rosreestr-ru/commons/complex-types/certification-doc/1.0" xmlns:doc="urn://x-artefacts-rosreestr-ru/commons/complex-types/document-output/4.0.1" xmlns:adr="urn://x-artefacts-rosreestr-ru/commons/complex-types/address-output/4.0.1" xmlns:num="urn://x-artefacts-rosreestr-ru/commons/complex-types/numbers/1.0" xmlns:nat="urn://x-artefacts-rosreestr-ru/commons/complex-types/natural-objects-output/1.0.1" xmlns:spa="urn://x-artefacts-rosreestr-ru/commons/complex-types/entity-spatial/5.0.1" xmlns:tns="urn://x-artefacts-smev-gov-ru/supplementary/commons/1.0.1" version="1.0">
	<xsl:output method="text"/>
	<xsl:template match="/">
		<xsl:value-of select="descendant::kp:Parcel/@CadastralNumber" /><xsl:text>	</xsl:text>
		<xsl:for-each select="descendant::kp:InnerCadastralNumbers">
			<xsl:value-of select="kp:CadastralNumber" /><xsl:if test="position()!=last()">;</xsl:if>
		</xsl:for-each>
		<xsl:value-of select="descendant::kp:Area/Area" /><xsl:text>	</xsl:text>
		<xsl:for-each select="kp:KPZU/kp:ReestrExtract/kp:ExtractObjectRight/kp:ExtractObject/kp:ObjectRight/kp:Right">
			<xsl:for-each select="kp:Owner">
				<xsl:value-of select="kp:Person/kp:Content" />
				<xsl:if test="position()!=last()">; </xsl:if>
			</xsl:for-each>
			<xsl:if test="position()!=last()">; </xsl:if>
		</xsl:for-each>
		<xsl:text>	</xsl:text><xsl:value-of select="kp:KPZU/kp:ReestrExtract/kp:ExtractObjectRight/kp:ExtractObject/kp:ObjectRight/kp:Right/kp:Registration/kp:RegNumber"/>
		<xsl:text>	</xsl:text><xsl:value-of select="kp:KPZU/kp:ReestrExtract/kp:ExtractObjectRight/kp:ExtractObject/kp:ObjectRight/kp:Right/kp:Registration/kp:RegDate"/>
		<xsl:text>
</xsl:text>
	</xsl:template>
</xsl:stylesheet>